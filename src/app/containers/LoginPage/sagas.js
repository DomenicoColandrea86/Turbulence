
import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  LOGIN_REQUEST,
} from './constants';

import api from '../../common/api';
import Models from '../../common/models';
import { invokeCallback } from '../../common/actions';
import { loginError, loginSuccess } from './actions';
import { setUserState } from '../../containers/App/actions';
import { REMOVE_LOGGED_USER } from '../../containers/App/constants';
import { createRequestSaga } from '../../common/sagas';
import { showSuccessNotificationRequest, showErrorNotificationRequest } from '../Notifications/actions';
import { setItem } from '../../utils/localStorage';

const requestLoginAsync = createRequestSaga({
  request: api.user.login,
  key: 'login',
  cancel: REMOVE_LOGGED_USER,
  success: [
    (response) => loginSuccess(response),
    ({ user }) => setUserState(new Models.User(user)),
    (response) => showSuccessNotificationRequest(response.message),
    (response) => invokeCallback(setItem('token', response.token)),
    () => push('/'),
  ],
  failure: [
    (error) => loginError(error),
    (error) => showErrorNotificationRequest(error.message),
  ],
});

const asyncWatchers = [
  function* asyncLoginWatcher() {
    yield [
      yield takeLatest(LOGIN_REQUEST, requestLoginAsync),
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
