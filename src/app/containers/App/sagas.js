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
} from './actions';

import api from '../../common/api';
import Models from '../../common/models';
import { invokeCallback } from '../../common/actions';
import { createRequestSaga } from '../../common/sagas';
import { selectNextPathname } from '../../common/selectors/routes';
import { removeItem } from '../../utils/localStorage';
import { showErrorNotificationRequest } from '../Notifications/actions';
import asyncNotificationWatchers from '../Notifications/sagas';

const requestAuthFromTokenAsync = createRequestSaga({
  request: api.user.reauthenticate,
  key: 'reauthenticate',
  cancel: REMOVE_LOGGED_USER,
  success: [
    (response) => authFromTokenSuccess(response),
    ({ user }) => setUserState(new Models.User(user)),
    () => push(select(selectNextPathname) ? select(selectNextPathname) : '/'),
  ],
  failure: [
    (error) => authFromTokenError(error),
    () => push('/login'),
  ],
});

const requestLogoutAsync = createRequestSaga({
  request: api.user.logout,
  key: 'logout',
  success: [
    () => setUserState(Models.User()),
    () => invokeCallback(removeItem('token')),
    () => push('/login'),
  ],
  failure: [
    (error) => showErrorNotificationRequest(error.message),
  ],
});

const asyncWatchers = [
  function* asyncAuthFromTokenWatcher() {
    yield [
      yield takeLatest(AUTHENTICATE_FROM_TOKEN, requestAuthFromTokenAsync),
    ];
  },
  function* asyncLogoutWatcher() {
    yield [
      yield takeLatest(REMOVE_LOGGED_USER, requestLogoutAsync),
    ];
  },
];

// root saga reducer
const rootSaga = function* rootSaga() {
  yield [
    ...asyncWatchers.map((watcher) => fork(watcher)),
    ...asyncNotificationWatchers.map((watcher) => fork(watcher)),
  ];
};

export default [
  rootSaga,
];
