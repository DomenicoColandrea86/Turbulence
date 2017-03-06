/**
 * ConfirmAccountPage actions
 */

import {
  AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN,
  AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_SUCCESS,
  AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_ERROR,
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_ERROR,
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

export function setPasswordRequest(payload) {
  return {
    type: SET_PASSWORD_REQUEST,
    payload,
  };
}

export function setPasswordSuccess(payload) {
  return {
    type: SET_PASSWORD_SUCCESS,
    payload,
  };
}

export function setPasswordError(payload) {
  return {
    type: SET_PASSWORD_ERROR,
    payload,
  };
}

