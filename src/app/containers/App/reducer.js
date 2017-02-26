import { fromJS } from 'immutable';

import {
  SET_LOADING_STATE,
  SET_ERROR_STATE,
  SET_USER_STATE,
  GET_USER_TOKEN_FROM_LOCALSTORAGE,
  AUTHENTICATE_FROM_TOKEN,
  AUTHENTICATE_FROM_TOKEN_ERROR,
} from './constants';

import { LOGOUT } from '../../components/LoginForm/constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  user: null,
});

export default function appReducer(state = initialState, action) {
  switch (action.type) {
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

    case GET_USER_TOKEN_FROM_LOCALSTORAGE:
      return {
        ...state,
        payload: action.payload,
      };

    case AUTHENTICATE_FROM_TOKEN:
      return {
        ...state,
        payload: action.payload,
      };

    case AUTHENTICATE_FROM_TOKEN_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case LOGOUT:
      return {
        ...state,
      };

    default:
      return state;
  }
}
