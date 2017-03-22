import { fromJS } from 'immutable';

import {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
} from './constants';

const initialState = fromJS([]);

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      return [
        ...state,
        action.notification,
      ];
    case NOTIFICATION_HIDE:
      return state.filter((notification) => notification.id !== action.notification.id);
    default:
      return state;
  }
}
