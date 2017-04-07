
import {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_INFO,
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_WARNING,
  NOTIFICATION_SHOW_REQUEST,
} from './constants';

export const showNotification = (notification) => ({
  type: NOTIFICATION_SHOW,
  notification,
});

export const hideNotification = (notification) => ({
  type: NOTIFICATION_HIDE,
  notification,
});

export const showSuccessNotificationRequest = (message) => ({
  type: NOTIFICATION_SHOW_REQUEST,
  notification: {
    message,
    type: NOTIFICATION_TYPE_SUCCESS,
  },
});

export const showErrorNotificationRequest = (message) => ({
  type: NOTIFICATION_SHOW_REQUEST,
  notification: {
    message,
    type: NOTIFICATION_TYPE_ERROR,
  },
});

export const showInfoNotificationRequest = (message) => ({
  type: NOTIFICATION_SHOW_REQUEST,
  notification: {
    message,
    type: NOTIFICATION_TYPE_INFO,
  },
});

export const showWarningNotificationRequest = (message) => ({
  type: NOTIFICATION_SHOW_REQUEST,
  notification: {
    message,
    type: NOTIFICATION_TYPE_WARNING,
  },
});

