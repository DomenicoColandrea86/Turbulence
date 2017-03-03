import {
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_ERROR,
} from './constants';

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
