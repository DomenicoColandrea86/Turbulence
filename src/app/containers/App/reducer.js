import { fromJS } from 'immutable';

import {
  REMOVE_LOGGED_USER,
  SET_LOADING_STATE,
  SET_ERROR_STATE,
  SET_USER_STATE,
  AUTHENTICATE_FROM_TOKEN,
  AUTHENTICATE_FROM_TOKEN_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  user: null,
});

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_LOGGED_USER:
      return {
        ...state,
      };
    case SET_LOADING_STATE:
      return {
        ...state,
        loading: action.payload.loading,
      };

    case SET_ERROR_STATE:
      return {
        ...state,
        error: action.payload.error,
      };

    case SET_USER_STATE:
      return {
        ...state,
        user: action.payload.user,
      };

    case AUTHENTICATE_FROM_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };

    case AUTHENTICATE_FROM_TOKEN_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
