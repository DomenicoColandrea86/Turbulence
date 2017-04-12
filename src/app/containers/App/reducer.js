import { v4 } from 'uuid';
import { fromJS } from 'immutable';
import Models from '../../common/models';

import {
  REMOVE_LOGGED_USER,
  SET_LOADING_STATE,
  SET_ERROR_STATE,
  SET_USER_STATE,
  AUTHENTICATE_FROM_TOKEN,
  AUTHENTICATE_FROM_TOKEN_ERROR,
} from './constants';

import {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
} from '../Notifications/constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  user: Models.User(),
  notifications: [],
});

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_LOGGED_USER:
      return state;

    case SET_LOADING_STATE:
      return state.set('loading', action.payload.loading);

    case SET_ERROR_STATE:
      return state.set('error', action.error);

    case SET_USER_STATE:
      return state.merge({ user: action.payload.user });

    case AUTHENTICATE_FROM_TOKEN:
      return state;

    case AUTHENTICATE_FROM_TOKEN_ERROR:
      return state.set('error', action.error);

    case NOTIFICATION_SHOW:
      return state.update('notifications', (list) =>
        list.push(new Models.Notification(Object.assign(action.notification, { id: v4() }))));

    case NOTIFICATION_HIDE:
      return state.update('notifications', (list) =>
        list.filter((notification) => notification.id !== action.notification.id));

    default:
      return state;
  }
}
