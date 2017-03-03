/**
 * ResetPasswordPage Sagas
 */

/* eslint-disable no-constant-condition, consistent-return */
import { take, call, put, fork } from 'redux-saga/effects';
import request from '../../utils/request';

import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
} from './constants';
import {
  forgotPasswordSuccess,
  forgotPasswordError,
} from './actions';

// Bootstrap sagas
export default [
  forgotPassword,
];

function* forgotPassword() {
  // listen for the FORGOT_PASSWORD_REQUEST action
  const { payload: { data, resolve, reject } } = yield take(FORGOT_PASSWORD_REQUEST);

  try {
    // execute the makeForgotPasswordRequest task asynchronously
    yield fork(makeForgotPasswordRequest, data, resolve, reject);

    // listen for the FORGOT_PASSWORD_SUCCESS action
    const { payload } = yield take([FORGOT_PASSWORD_SUCCESS]);

    // resolve promise
    yield call(resolve, payload);
  } catch (error) {
    // dispatch FORGOT_PASSWORD_ERROR action
    yield put(forgotPasswordError(error));
    yield call(reject, error);
  }
}

function* makeForgotPasswordRequest(data, resolve, reject) {
  const { email } = data.toJS();
  try {
    // send a post request with the login credentials
    const response = yield call(request, '/api/v1/user/forgotPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      mode: 'cors',
    });

    // dispatch FORGOT_PASSWORD_SUCCESS action
    yield put(forgotPasswordSuccess(response));
  } catch (err) {
    // dispatch FORGOT_PASSWORD_ERROR action
    yield put(forgotPasswordError(err));
    // reject error
    yield call(reject, err);
  }
}
