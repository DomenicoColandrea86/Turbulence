
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  AUTH_RESET_PASSWORD_TOKEN,
  AUTH_RESET_PASSWORD_TOKEN_SUCCESS,
  AUTH_RESET_PASSWORD_TOKEN_ERROR,
} from './constants';

export const authResetPasswordToken = (token) => ({
  type: AUTH_RESET_PASSWORD_TOKEN,
  payload: {
    token,
  },
});

export const authResetPasswordTokenSuccess = (payload) => ({
  type: AUTH_RESET_PASSWORD_TOKEN_SUCCESS,
  payload,
});

export const authResetPasswordTokenError = (error) => ({
  type: AUTH_RESET_PASSWORD_TOKEN_ERROR,
  error,
});

export const resetPasswordRequest = (payload) => ({
  type: RESET_PASSWORD_REQUEST,
  payload,
});

export const resetPasswordSuccess = (payload) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload,
});

export const resetPasswordError = (payload) => ({
  type: RESET_PASSWORD_ERROR,
  payload,
});
