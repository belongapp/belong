const AUTH_SECRET = 'auth-secret';
const VIEWER_TOKEN = 'viewer-token';

export function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

// TODO check in backend that token is valid (e.g user may have been deleted)
export function loggedIn() {
  return !!getToken();
}

export function loggedOut() {
  return !getSecret() && !loggedIn();
}

export function storeSecret(secret) {
  sessionStorage.setItem(AUTH_SECRET, secret);
}

function getSecret() {
  return sessionStorage.getItem(AUTH_SECRET);
}

export function popSecret() {
  const secret = getSecret();
  sessionStorage.removeItem(AUTH_SECRET);
  return secret;
}

export function storeToken(token) {
  localStorage.setItem(VIEWER_TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(VIEWER_TOKEN);
}

export function clearStorage() {
  localStorage.clear();
}
