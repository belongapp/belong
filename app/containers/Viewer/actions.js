import {
  LOGOUT,
} from './constants';

export function logout() {
  return {
    type: LOGOUT,
  };
}
