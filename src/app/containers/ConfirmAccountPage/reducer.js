/**
 * ConfirmAccountPage reducer
 */

import {
  AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN,
  AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_SUCCESS,
  AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_ERROR,
} from './constants';

const initialState = {};

export default function confirmAccountPage(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN:
      return {
        ...state,
        payload: action.payload,
      };

    case AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
