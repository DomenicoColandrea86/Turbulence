/**
 * App Sagas
 */

import { takeLatest } from 'redux-saga';
import { fork, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  REMOVE_LOGGED_USER,
  AUTHENTICATE_FROM_TOKEN,
} from './constants';

import {
  authFromTokenSuccess,
  authFromTokenError,
  setUserState,
  removeLoggedUser,
} from './actions';

import api from '../../common/api';
import { invokeCallback } from '../../common/actions';
import { createRequestSaga } from '../../common/sagas';
import { selectNextPathname } from '../../common/selectors/router.selector';
import { removeItem } from '../../utils/localStorage';
import { showSuccessNotificationRequest, showErrorNotificationRequest } from '../Notifications/actions';
import notificationSagas from '../Notifications/sagas';

const requestAuthFromTokenAsync = createRequestSaga({
  request: api.auth.reauthenticate,
  key: 'reauthenticate',
  cancel: REMOVE_LOGGED_USER,
  success: [
    (response) => authFromTokenSuccess(response),
    (response) => setUserState(response.user),
    (response) => showSuccessNotificationRequest(response.message),
    () => push(select(selectNextPathname) ? select(selectNextPathname) : '/'),
  ],
  failure: [
    (error) => authFromTokenError(error),
    (error) => showErrorNotificationRequest(error.message),
  ],
});

const requestLogoutAsync = createRequestSaga({
  request: api.auth.logout,
  key: 'logout',
  success: [
    () => removeLoggedUser(),
    () => setUserState(null),
    () => invokeCallback(removeItem('token')),
    () => push('/login'),
  ],
  failure: [
    (error) => showErrorNotificationRequest(error.message),
  ],
});

const asyncWatchers = [
  function* asyncAuthFromTokenFetchWatcher() {
    yield [
      yield takeLatest(AUTHENTICATE_FROM_TOKEN, requestAuthFromTokenAsync),
    ];
  },
  function* asyncLogoutFetchWatcher() {
    yield [
      yield takeLatest(REMOVE_LOGGED_USER, requestLogoutAsync),
    ];
  },
];

// root saga reducer
const rootSaga = function* rootSaga() {
  yield [
    ...asyncWatchers.map((watcher) => fork(watcher)),
    ...notificationSagas.map((watcher) => fork(watcher)),
  ];
};

export default [
  rootSaga,
];
