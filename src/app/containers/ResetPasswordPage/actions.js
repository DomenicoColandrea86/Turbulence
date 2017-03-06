/**
 * ResetPasswordPage actions
 */

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  AUTHENTICATE_RESET_PASSWORD_TOKEN,
  AUTHENTICATE_RESET_PASSWORD_TOKEN_SUCCESS,
  AUTHENTICATE_RESET_PASSWORD_TOKEN_ERROR,
} from './constants';

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

export function resetPasswordRequest(payload) {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload,
  };
}

export function resetPasswordSuccess(payload) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload,
  };
}

export function resetPasswordError(payload) {
  return {
    type: RESET_PASSWORD_ERROR,
    payload,
  };
}
