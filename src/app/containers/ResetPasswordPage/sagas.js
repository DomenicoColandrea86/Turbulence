
import { push } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import {
  RESET_PASSWORD_REQUEST,
  AUTH_RESET_PASSWORD_TOKEN,
} from './constants';

import {
  resetPasswordSuccess,
  resetPasswordError,
  authResetPasswordTokenSuccess,
  authResetPasswordTokenError,
} from './actions';

import api from '../../common/api';
import { invokeCallback } from '../../common/actions';
import { setUserState } from '../App/actions';
import { REMOVE_LOGGED_USER } from '../../containers/App/constants';
import { createRequestSaga } from '../../common/sagas';
import { setItem } from '../../utils/localStorage';
import { showSuccessNotificationRequest, showErrorNotificationRequest } from '../Notifications/actions';

const requestAuthResetPasswordAsync = createRequestSaga({
  request: api.user.authResetPassword,
  key: 'authConfirmAccount',
  cancel: REMOVE_LOGGED_USER,
  success: [
    (response) => authResetPasswordTokenSuccess(response),
  ],
  failure: [
    (error) => authResetPasswordTokenError(error),
    () => push('/login'),
  ],
});

const requestResetPasswordAsync = createRequestSaga({
  request: api.user.resetPassword,
  key: 'setPassword',
  cancel: REMOVE_LOGGED_USER,
  success: [
    (response) => resetPasswordSuccess(response),
    (response) => setUserState(response.user),
    (response) => invokeCallback(setItem('token', response.token)),
    (response) => showSuccessNotificationRequest(response.message),
    () => push('/login'),
  ],
  failure: [
    (error) => resetPasswordError(error),
    (error) => showErrorNotificationRequest(error.message),
    () => push('/login'),
  ],
});

const asyncWatchers = [
  function* asyncAuthResetPasswordWatcher() {
    yield [
      yield takeLatest(AUTH_RESET_PASSWORD_TOKEN, requestAuthResetPasswordAsync),
    ];
  },
  function* asyncResetPasswordWatcher() {
    yield [
      yield takeLatest(RESET_PASSWORD_REQUEST, requestResetPasswordAsync),
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
