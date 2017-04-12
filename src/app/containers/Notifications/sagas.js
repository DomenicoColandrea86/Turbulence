import { call, fork, put } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';

import { NOTIFICATION_SHOW_REQUEST } from './constants';
import { showNotification, hideNotification } from './actions';

function* requestNotificationAsync(action) {
  try {
    yield put(showNotification(action.notification));
    yield call(delay, 4100);
    yield put(hideNotification(action.notification));
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
}

const asyncWatchers = [
  function* asyncNotificationWatcher() {
    yield [
      yield takeEvery(NOTIFICATION_SHOW_REQUEST, requestNotificationAsync),
    ];
  },
];

// root saga reducer
const rootSaga = function* rootSaga() {
  yield [
    ...asyncWatchers.map((watcher) => fork(watcher)),
  ];
};

export default [
  rootSaga,
];
