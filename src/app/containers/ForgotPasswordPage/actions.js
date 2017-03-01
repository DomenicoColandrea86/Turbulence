/**
 * ForgotPasswordPage actions
 */

import {
  DEFAULT_ACTION,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function forgotPasswordRequest(payload) {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    payload,
  };
}

export function forgotPasswordSuccess(payload) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload,
  };
}

export function forgotPasswordError(error) {
  return {
    type: FORGOT_PASSWORD_ERROR,
    error,
  };
}
