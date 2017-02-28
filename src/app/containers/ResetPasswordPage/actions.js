/**
 * ResetPasswordPage actions
 */

import {
  DEFAULT_ACTION,
  AUTHENTICATE_RESET_PASSWORD_TOKEN,
  AUTHENTICATE_RESET_PASSWORD_TOKEN_SUCCESS,
  AUTHENTICATE_RESET_PASSWORD_TOKEN_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function authenticateResetPasswordToken(payload) {
  return {
    type: AUTHENTICATE_RESET_PASSWORD_TOKEN,
    payload,
  };
}

export function authenticateResetPasswordTokenSuccess(payload) {
  return {
    type: AUTHENTICATE_RESET_PASSWORD_TOKEN_SUCCESS,
    payload,
  };
}

export function authenticateResetPasswordTokenError(error) {
  return {
    type: AUTHENTICATE_RESET_PASSWORD_TOKEN_ERROR,
    error,
  };
}
