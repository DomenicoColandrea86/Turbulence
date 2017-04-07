import { fromJS } from 'immutable';

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from './constants';

const initialState = fromJS({});

export default function signupPageReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return state.set('payload', action.payload);

    case SIGNUP_SUCCESS:
      return state.set('payload', action.payload);

    case SIGNUP_ERROR:
      return state.set('error', action.error);

    default:
      return state;
  }
}
