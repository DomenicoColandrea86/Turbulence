import { fromJS } from 'immutable';

import {
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_ERROR,
  AUTH_CONFIRM_ACCOUNT_REQUEST,
  AUTH_CONFIRM_ACCOUNT_SUCCESS,
  AUTH_CONFIRM_ACCOUNT_ERROR,
} from './constants';

const initialState = fromJS({});

export default function confirmAccountPage(state = initialState, action) {
  switch (action.type) {
    case SET_PASSWORD_REQUEST:
      return state.set('payload', action.payload);

    case SET_PASSWORD_SUCCESS:
      return state.set('payload', action.payload);

    case SET_PASSWORD_ERROR:
      return state.set('error', action.error);

    case AUTH_CONFIRM_ACCOUNT_REQUEST:
      return state.set('token', action.payload.token);

    case AUTH_CONFIRM_ACCOUNT_SUCCESS:
      return state.set('payload', action.payload);

    case AUTH_CONFIRM_ACCOUNT_ERROR:
      return state.set('error', action.error);

    default:
      return state;
  }
}
