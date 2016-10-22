/**
 * 1. sets up auth library and waits for auth token
 * 2. gets user profile
 */

import { call, put, take } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { updateNetworkLayer } from 'relay/index';
import { storeToken } from 'containers/Viewer/lib';
import { loginCallback, getProfile, createUserIfNeededAndSignIn } from './lib';
import { loginCallbackRequest, loginCallbackError } from './actions';

function* loginCallbackSaga() {
  try {
    const { authToken, nextPathname } = yield call(loginCallback);
    const profile = yield call(getProfile, authToken);
    const viewerToken = yield createUserIfNeededAndSignIn(authToken, profile);
    storeToken(viewerToken);
    updateNetworkLayer(viewerToken);
    return nextPathname;
  } catch (err) {
    // TODO display error to user
    console.log('login error!', err);
    yield put(loginCallbackError(err));
    return '/';
  }
}

function* init() {
  yield take(loginCallbackRequest().type);
  const nextPathname = yield call(loginCallbackSaga);
  browserHistory.push(nextPathname);
}

export default [
  init,
];
