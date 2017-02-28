/**
 * ResetPasswordPage reducer
 */

import {
  DEFAULT_ACTION,
  AUTHENTICATE_RESET_PASSWORD_TOKEN,
  AUTHENTICATE_RESET_PASSWORD_TOKEN_SUCCESS,
  AUTHENTICATE_RESET_PASSWORD_TOKEN_ERROR,
} from './constants';

const initialState = {};

export default function resetPasswordPageReducer(state = initialState, action) {
  switch (action.type) {
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

    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}
