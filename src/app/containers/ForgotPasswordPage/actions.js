
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from './constants';

export const forgotPasswordRequest = (payload) => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload,
});

export const forgotPasswordSuccess = (payload) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload,
});

export const forgotPasswordError = (payload) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload,
});
