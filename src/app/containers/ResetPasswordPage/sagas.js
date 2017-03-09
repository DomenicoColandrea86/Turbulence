
/* eslint-disable no-constant-condition, consistent-return */
import { push } from 'react-router-redux';
import { take, call, put, fork } from 'redux-saga/effects';

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  AUTHENTICATE_RESET_PASSWORD_TOKEN,
  AUTHENTICATE_RESET_PASSWORD_TOKEN_SUCCESS,
} from './constants';

import {
  resetPasswordSuccess,
  resetPasswordError,
  authenticateResetPasswordTokenSuccess,
  authenticateResetPasswordTokenError,
} from './actions';

import request from '../../utils/request';

// sagas to be loaded
export default [
  authenticateToken,
  resetPasswordFlow,
];

function* authenticateToken() {
  // listen for the AUTHENTICATE_RESET_PASSWORD_TOKEN action
  const { payload: { token, resolve, reject } } = yield take(AUTHENTICATE_RESET_PASSWORD_TOKEN);
  try {
    // execute the authorize task asynchronously
    yield fork(authorizeToken, token, resolve, reject);
    // listen for the AUTHENTICATE_RESET_PASSWORD_TOKEN_SUCCESS action
    const { payload } = yield take([AUTHENTICATE_RESET_PASSWORD_TOKEN_SUCCESS]);
    // resolve promise
    yield call(resolve, payload);
  } catch (error) {
    // dispatch AUTHENTICATE_RESET_PASSWORD_TOKEN_ERROR action
    yield put(authenticateResetPasswordTokenError(error));
    yield reject(error);
  }
}

function* authorizeToken(token, resolve, reject) {
  try {
    // send a post request with the login credentials
    const response = yield call(request, '/api/v1/user/authenticateResetPasswordToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      mode: 'cors',
    });
    // throw error
    if (!response.success) throw response;
    // dispatch AUTHENTICATE_RESET_PASSWORD_TOKEN_SUCCESS action
    yield put(authenticateResetPasswordTokenSuccess(response));
  } catch (err) {
    // redirect to login
    yield put(push('/login'));
    // dispatch AUTHENTICATE_RESET_PASSWORD_TOKEN_ERROR action
    yield put(authenticateResetPasswordTokenError(err));
    // reject error
    yield reject(err);
  }
}

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
    if (!response.success) throw response;
    // dispatch RESET_PASSWORD_SUCCESS action
    yield put(resetPasswordSuccess(response));
  } catch (err) {
    // dispatch RESET_PASSWORD_ERROR action
    yield put(resetPasswordError(err));
    // reject error
    yield reject(err);
  }
}
