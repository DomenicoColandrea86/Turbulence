/**
 * LoginPage reducer
 */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

const initialState = {};

export default function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        payload: action.payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        payload: action.payload,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
