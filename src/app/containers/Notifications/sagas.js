/* eslint-disable no-constant-condition, consistent-return */
import { v4 } from 'uuid';
import { call, fork, put } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';

import { NOTIFICATION_SHOW_REQUEST } from './constants';
import { showNotification, hideNotification } from './actions';

export default [
  asyncNotificationWatcher,
];

function* asyncNotificationWatcher() {
  yield fork(takeEvery, NOTIFICATION_SHOW_REQUEST, initNotification);
}

function* initNotification(action) {
  try {
    const notification = Object.assign({}, action.notification, { id: v4() });
    yield put(showNotification(notification));
    yield call(delay, 4100);
    yield put(hideNotification(notification));
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
}
