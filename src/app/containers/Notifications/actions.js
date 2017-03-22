
import {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_INFO,
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_WARNING,
  NOTIFICATION_SHOW_REQUEST,
} from './constants';

export function showNotification(notification) {
  return {
    type: NOTIFICATION_SHOW,
    notification,
  };
}

export function hideNotification(notification) {
  return {
    type: NOTIFICATION_HIDE,
    notification,
  };
}

export function showSuccessNotificationRequest(message) {
  return {
    type: NOTIFICATION_SHOW_REQUEST,
    notification: {
      message,
      type: NOTIFICATION_TYPE_SUCCESS,
    },
  };
}

export function showErrorNotificationRequest(message) {
  return {
    type: NOTIFICATION_SHOW_REQUEST,
    notification: {
      message,
      type: NOTIFICATION_TYPE_ERROR,
    },
  };
}

export function showInfoNotificationRequest(message) {
  return {
    type: NOTIFICATION_SHOW_REQUEST,
    notification: {
      message,
      type: NOTIFICATION_TYPE_INFO,
    },
  };
}

export function showWarningNotificationRequest(message) {
  return {
    type: NOTIFICATION_SHOW_REQUEST,
    notification: {
      message,
      type: NOTIFICATION_TYPE_WARNING,
    },
  };
}

