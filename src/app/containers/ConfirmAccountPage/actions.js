/**
 * ConfirmAccountPage actions
 */

import {
  AUTH_CONFIRM_ACCOUNT_REQUEST,
  AUTH_CONFIRM_ACCOUNT_SUCCESS,
  AUTH_CONFIRM_ACCOUNT_ERROR,
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_ERROR,
} from './constants';

export const authConfirmAccountToken = (token) => ({
  type: AUTH_CONFIRM_ACCOUNT_REQUEST,
  payload: {
    token,
  },
});

export const authConfirmAccountTokenSuccess = (payload) => ({
  type: AUTH_CONFIRM_ACCOUNT_SUCCESS,
  payload,
});

export const authConfirmAccountTokenError = (payload) => ({
  type: AUTH_CONFIRM_ACCOUNT_ERROR,
  payload,
});

export const setPasswordRequest = (payload) => ({
  type: SET_PASSWORD_REQUEST,
  payload,
});

export const setPasswordSuccess = (payload) => ({
  type: SET_PASSWORD_SUCCESS,
  payload,
});

export const setPasswordError = (payload) => ({
  type: SET_PASSWORD_ERROR,
  payload,
});

