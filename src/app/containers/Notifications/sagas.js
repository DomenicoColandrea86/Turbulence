/* eslint-disable no-constant-condition, consistent-return */
import crypto from 'crypto';
import { takeEvery, call, fork, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { NOTIFICATION_SHOW_REQUEST } from './constants';
import { showNotification, hideNotification } from './actions';

export default [
  watchNotification,
];

function* watchNotification() {
  yield fork(takeEvery, NOTIFICATION_SHOW_REQUEST, initNotification);
}

function* initNotification(action) {
  try {
    const notification = Object.assign({}, action.notification, { id: crypto.randomBytes(20).toString('hex') });
    yield put(showNotification(notification));
    yield call(delay, 4100);
    yield put(hideNotification(notification));
  } catch (error) {
    console.log('ERROR: ', error);
  }
}
