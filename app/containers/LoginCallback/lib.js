import Auth0Lock from 'auth0-lock';
import { call } from 'redux-saga/effects';
import { mutate } from 'utils/request';
import { popSecret } from 'containers/Viewer/lib';
import { CreateUserMutation, SignInUserMutation } from 'relay/mutations';

let lock;

export function* loginCallback() {
  lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);
  const { idToken: authToken, state } = yield call(onAuthenticated);
  const { secret, nextPathname } = JSON.parse(state);
  checkSecret(secret);
  return { authToken, nextPathname };
}

function onAuthenticated() {
  return new Promise((resolve) => lock.on('authenticated', resolve));
}

function checkSecret(actual) {
  if (actual !== popSecret()) {
    throw new Error('Unexpected auth secret');
  }
}

export function* getProfile(authToken) {
  return yield call(onProfile, authToken);
}

function onProfile(authToken) {
  return new Promise((resolve, reject) => {
    lock.getProfile(authToken, (error, profile) => (error ? reject(error) : resolve(profile)));
  });
}

export function* createUserIfNeededAndSignIn(authToken, profile) {
  const viewerId = 'viewer-fixed';
  yield createUserIfNeeded(viewerId, authToken, profile);
  return yield signInUser(viewerId, authToken);
}

function* createUserIfNeeded(viewerId, authToken, profile) {
  try {
    yield mutate(
      new CreateUserMutation({
        viewerId,
        authToken,
        ...createUserDataFromProfile(profile),
      })
    );
  } catch (e) {
    // 3023 means user was already created, so let's ignore this error
    // see https://github.com/graphcool/dashboard/issues/294
    if (!e.source || e.source.errors[0].code !== 3023) {
      throw e;
    }
  }
}

function createUserDataFromProfile(profile) {
  const user = {
    givenName: profile.given_name,
    familyName: profile.family_name,
    picture: profile.picture,
  };
  user.slug = createSlug(user);
  return user;
}

function createSlug({ givenName, familyName }) {
  return `${givenName.substring(0, 1)}${familyName}`.substring(0, 8).toLowerCase();
}

function* signInUser(viewerId, authToken) {
  const signInUserResponse = yield mutate(
    new SignInUserMutation({
      viewerId,
      authToken,
    })
  );
  return signInUserResponse.signinUser.token;
}
