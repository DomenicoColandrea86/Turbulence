/**
 * SignupPage reducer
 */

import {
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

    default:
      return state;
  }
}
