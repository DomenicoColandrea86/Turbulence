
import {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
  NOTIFICATION_HIDDEN,
  NOTIFICATION_STATUS_SHOW,
  NOTIFICATION_STATUS_HIDE,
  NOTIFICATION_STATUS_HIDDEN,
} from './constants';

const initialState = {
  text: '',
  type: '',
  status: NOTIFICATION_STATUS_HIDDEN,
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      return {
        ...state,
        ...action.notification,
        status: NOTIFICATION_STATUS_SHOW,
      };

    case NOTIFICATION_HIDE:
      return {
        ...state,
        ...action.notification,
        status: NOTIFICATION_STATUS_HIDE,
      };

    case NOTIFICATION_HIDDEN:
      return {
        ...state,
        ...action.notification,
        status: NOTIFICATION_STATUS_HIDDEN,
      };

    default:
      return state;
  }
}
