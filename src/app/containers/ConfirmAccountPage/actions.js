/**
 * ConfirmAccountPage actions
 */

import {
  AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN,
  AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_SUCCESS,
  AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_ERROR,
} from './constants';

export function authenticateConfirmAccountToken(payload) {
  return {
    type: AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN,
    payload,
  };
}

export function authenticateConfirmAccountTokenSuccess(payload) {
  return {
    type: AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_SUCCESS,
    payload,
  };
}

export function authenticateConfirmAccountTokenError(error) {
  return {
    type: AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_ERROR,
    error,
  };
}
