
import {
  REMOVE_LOGGED_USER,
  SET_LOADING_STATE,
  SET_ERROR_STATE,
  SET_USER_STATE,
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

export const authFromToken = (token) => ({
  type: AUTHENTICATE_FROM_TOKEN,
  payload: {
    token,
  },
});

export const authFromTokenSuccess = (payload) => ({
  type: AUTHENTICATE_FROM_TOKEN_SUCCESS,
  payload,
});

export const authFromTokenError = (error) => ({
  type: AUTHENTICATE_FROM_TOKEN_ERROR,
  error,
});
