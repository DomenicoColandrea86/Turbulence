/**
 * ResetPasswordPage reducer
 */

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  AUTHENTICATE_RESET_PASSWORD_TOKEN,
  AUTHENTICATE_RESET_PASSWORD_TOKEN_SUCCESS,
  AUTHENTICATE_RESET_PASSWORD_TOKEN_ERROR,
} from './constants';

const initialState = {};

export default function resetPasswordPageReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        payload: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case AUTHENTICATE_RESET_PASSWORD_TOKEN:
      return {
        ...state,
        payload: action.payload,
      };

    case AUTHENTICATE_RESET_PASSWORD_TOKEN_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case AUTHENTICATE_RESET_PASSWORD_TOKEN_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
