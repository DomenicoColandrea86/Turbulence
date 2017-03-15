
import {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
  NOTIFICATION_STATUS_SHOW,
  NOTIFICATION_STATUS_HIDE,
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_INFO,
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_WARNING,
} from './constants';

export function hideNotification() {
  return {
    type: NOTIFICATION_HIDE,
    notification: {
      text: '',
      type: '',
      status: NOTIFICATION_STATUS_HIDE,
    },
  };
}

export function showSuccessNotification(text) {
  return {
    type: NOTIFICATION_SHOW,
    notification: {
      text,
      status: NOTIFICATION_STATUS_SHOW,
      type: NOTIFICATION_TYPE_SUCCESS,
    },
  };
}

export function showInfoNotification(text) {
  return {
    type: NOTIFICATION_SHOW,
    notification: {
      text,
      status: NOTIFICATION_TYPE_INFO,
      type: NOTIFICATION_TYPE_SUCCESS,
    },
  };
}

export function showErrorNotification(text) {
  return {
    type: NOTIFICATION_SHOW,
    notification: {
      text,
      status: NOTIFICATION_STATUS_SHOW,
      type: NOTIFICATION_TYPE_ERROR,
    },
  };
}

export function showWarningNotification(text) {
  return {
    type: NOTIFICATION_SHOW,
    notification: {
      text,
      status: NOTIFICATION_STATUS_SHOW,
      type: NOTIFICATION_TYPE_WARNING,
    },
  };
}

