
import { push } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import {
  SET_PASSWORD_REQUEST,
  AUTH_CONFIRM_ACCOUNT_REQUEST,
} from './constants';

import {
  setPasswordSuccess,
  setPasswordError,
  authConfirmAccountTokenSuccess,
  authConfirmAccountTokenError,
} from './actions';

import api from '../../common/api';
import { invokeCallback } from '../../common/actions';
import { setUserState } from '../App/actions';
import { REMOVE_LOGGED_USER } from '../../containers/App/constants';
import { createRequestSaga } from '../../common/sagas';
import { setItem } from '../../utils/localStorage';
import { showSuccessNotificationRequest, showErrorNotificationRequest } from '../Notifications/actions';

const requestAuthConfirmAccountAsync = createRequestSaga({
  request: api.user.authConfirmAccount,
  key: 'authConfirmAccount',
  cancel: REMOVE_LOGGED_USER,
  success: [
    (response) => authConfirmAccountTokenSuccess(response),
  ],
  failure: [
    (error) => authConfirmAccountTokenError(error),
    () => push('/login'),
  ],
});

const requestSetPasswordAsync = createRequestSaga({
  request: api.user.create,
  key: 'setPassword',
  cancel: REMOVE_LOGGED_USER,
  success: [
    (response) => setPasswordSuccess(response),
    (response) => setUserState(response.user),
    (response) => invokeCallback(setItem('token', response.token)),
    (response) => showSuccessNotificationRequest(response.message),
    () => push('/'),
  ],
  failure: [
    (error) => setPasswordError(error),
    (error) => showErrorNotificationRequest(error.message),
    () => push('/login'),
  ],
});

const asyncWatchers = [
  function* asyncAuthConfirmAccountWatcher() {
    yield [
      yield takeLatest(AUTH_CONFIRM_ACCOUNT_REQUEST, requestAuthConfirmAccountAsync),
    ];
  },
  function* asyncSetPasswordWatcher() {
    yield [
      yield takeLatest(SET_PASSWORD_REQUEST, requestSetPasswordAsync),
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
