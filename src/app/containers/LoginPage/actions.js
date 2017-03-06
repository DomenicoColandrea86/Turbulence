/**
 * LoginPage actions
 */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from './constants';

export function loginRequest(payload) {
  return {
    type: LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
}

export function loginError(payload) {
  return {
    type: LOGIN_ERROR,
    payload,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
