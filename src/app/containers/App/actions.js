
import {
  REMOVE_LOGGED_USER,
  SET_LOADING_STATE,
  SET_ERROR_STATE,
  SET_USER_STATE,
  GET_USER_TOKEN_FROM_LOCALSTORAGE,
  AUTHENTICATE_FROM_TOKEN,
  AUTHENTICATE_FROM_TOKEN_SUCCESS,
  AUTHENTICATE_FROM_TOKEN_ERROR,
} from './constants';

export const setLoadingState = (loading) => ({
  type: SET_LOADING_STATE,
  payload: {
    loading,
  },
});

export const setErrorState = (error = new Error('Something went wrong.')) => ({
  type: SET_ERROR_STATE,
  payload: {
    error,
  },
});

export const removeLoggedUser = () => ({
  type: REMOVE_LOGGED_USER,
});

export const setUserState = (user) => ({
  type: SET_USER_STATE,
  payload: {
    user,
  },
});

export const getUserTokenFromLocalstorage = (payload) => ({
  type: GET_USER_TOKEN_FROM_LOCALSTORAGE,
  payload,
});

export const authenticateFromToken = (payload) => ({
  type: AUTHENTICATE_FROM_TOKEN,
  payload,
});

export const authenticateFromTokenSuccess = (payload) => ({
  type: AUTHENTICATE_FROM_TOKEN_SUCCESS,
  payload,
});

export const authenticateFromTokenError = (error) => ({
  type: AUTHENTICATE_FROM_TOKEN_ERROR,
  error,
});
