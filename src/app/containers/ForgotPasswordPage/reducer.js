/**
 * ForgotPasswordPage reducer
 */

import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from './constants';

const initialState = {};

export default function forgotPasswordPageReducer(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        payload: action.payload,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
