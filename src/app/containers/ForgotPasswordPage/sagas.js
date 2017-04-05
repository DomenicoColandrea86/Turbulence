
import { push } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import {
  FORGOT_PASSWORD_REQUEST,
} from './constants';

import {
  forgotPasswordSuccess,
  forgotPasswordError,
} from './actions';

import api from '../../common/api';
import { invokeCallback } from '../../common/actions';
import { REMOVE_LOGGED_USER } from '../../containers/App/constants';
import { createRequestSaga } from '../../common/sagas';
import { removeItem } from '../../utils/localStorage';
import { showSuccessNotificationRequest, showErrorNotificationRequest } from '../Notifications/actions';

const requestForgotPasswordAsync = createRequestSaga({
  request: api.user.forgotPassword,
  key: 'forgotPassword',
  cancel: REMOVE_LOGGED_USER,
  success: [
    (response) => forgotPasswordSuccess(response),
    () => invokeCallback(removeItem('token')),
    (response) => showSuccessNotificationRequest(response.message),
  ],
  failure: [
    (error) => forgotPasswordError(error),
    (error) => showErrorNotificationRequest(error.message),
    () => push('/login'),
  ],
});

const asyncWatchers = [
  function* asyncForgotPasswordWatcher() {
    yield [
      yield takeLatest(FORGOT_PASSWORD_REQUEST, requestForgotPasswordAsync),
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
