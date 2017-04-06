import { fromJS } from 'immutable';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

const initialState = fromJS({});

export default function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set('payload', action.payload);

    case LOGIN_SUCCESS:
      return state.set('payload', action.payload);

    case LOGIN_ERROR:
      return state.set('error', action.error);

    default:
      return state;
  }
}
