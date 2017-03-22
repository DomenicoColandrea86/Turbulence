
import {
  SET_LOADING_STATE,
  SET_ERROR_STATE,
  SET_USER_STATE,
  GET_USER_TOKEN_FROM_LOCALSTORAGE,
  AUTHENTICATE_FROM_TOKEN,
  AUTHENTICATE_FROM_TOKEN_SUCCESS,
  AUTHENTICATE_FROM_TOKEN_ERROR,
} from './constants';

export function setLoadingState(loading) {
  return {
    type: SET_LOADING_STATE,
    payload: {
      loading,
    },
  };
}

export function setErrorState(error = new Error('Something went wrong.')) {
  return {
    type: SET_ERROR_STATE,
    payload: {
      error,
    },
  };
}

export function setUserState(user) {
  return {
    type: SET_USER_STATE,
    payload: {
      user,
    },
  };
}

export function getUserTokenFromLocalstorage(payload) {
  return {
    type: GET_USER_TOKEN_FROM_LOCALSTORAGE,
    payload,
  };
}

export function authenticateFromToken(payload) {
  return {
    type: AUTHENTICATE_FROM_TOKEN,
    payload,
  };
}

export function authenticateFromTokenSuccess(payload) {
  return {
    type: AUTHENTICATE_FROM_TOKEN_SUCCESS,
    payload,
  };
}

export function authenticateFromTokenError(error) {
  return {
    type: AUTHENTICATE_FROM_TOKEN_ERROR,
    error,
  };
}

export function setNotificationsState(notifications) {
  return {
    type: SET_USER_STATE,
    notifications: [
      ...notifications,
    ],
  };
}
