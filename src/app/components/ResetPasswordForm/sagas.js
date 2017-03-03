/**
 * ResetPasswordForm Sagas
 */

/* eslint-disable no-constant-condition, consistent-return */
import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from '../../utils/request';

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from './constants';
import {
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';

// Bootstrap sagas
export default [
  resetPasswordFlow,
];

function* resetPasswordFlow() {
  // listen for the RESET_PASSWORD_REQUEST action
  const { payload: { data, resolve, reject } } = yield take(RESET_PASSWORD_REQUEST);

  try {
    // execute the setNewPassword task asynchronously
    yield fork(setNewPassword, data, resolve, reject);

    // listen for the RESET_PASSWORD_SUCCESS action
    const { payload } = yield take([RESET_PASSWORD_SUCCESS]);

    // resolve promise
    yield call(resolve, payload);

    // redirect to login page
    yield put(push('/login'));
  } catch (error) {
    // dispatch RESET_PASSWORD_ERROR action
    yield put(resetPasswordError(error));
    yield reject(error);
  }
}

function* setNewPassword(data, resolve, reject) {
  const { password, token } = data;
  try {
    // send a post request with the login credentials
    const response = yield call(request, '/api/v1/user/resetPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, token }),
      mode: 'cors',
    });

    // dispatch RESET_PASSWORD_SUCCESS action
    yield put(resetPasswordSuccess(response));
  } catch (err) {
    // dispatch RESET_PASSWORD_ERROR action
    yield put(resetPasswordError(err));
    // reject error
    yield reject(err);
  }
}
