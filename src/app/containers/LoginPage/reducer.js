/**
 * LoginPage reducer
 */

import {
  DEFAULT_ACTION,
} from './constants';

const initialState = {};

export default function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}
