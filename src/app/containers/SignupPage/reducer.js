/**
 * SignupPage reducer
 */

import {
  DEFAULT_ACTION,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from './constants';

const initialState = {};

export default function signupPageReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        payload: action.payload,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case SIGNUP_ERROR:
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
