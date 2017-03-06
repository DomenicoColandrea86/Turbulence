/* eslint-disable no-constant-condition, consistent-return */
import { push } from 'react-router-redux';
import { take, call, put, fork } from 'redux-saga/effects';

import {
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN,
  AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_SUCCESS,
} from './constants';

import {
  setPasswordSuccess,
  setPasswordError,
  authenticateConfirmAccountTokenSuccess,
  authenticateConfirmAccountTokenError,
} from './actions';

import request from '../../utils/request';
import { setUserState } from '../App/actions';
import { setItem } from '../../utils/localStorage';

// sagas to be loaded
export default [
  authenticateToken,
  setPasswordFlow,
];

function* authenticateToken() {
  // listen for the AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN action
  const { payload: { token, resolve, reject } } = yield take(AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN);
  try {
    // execute the authorize task asynchronously
    yield fork(authorizeToken, token, resolve, reject);
    // listen for the AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_SUCCESS action
    const { payload } = yield take([AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_SUCCESS]);
    // dispatch action to set user details to app.user
    // in this case its just the email and isAuthorized flag
    yield put(setUserState({
      ...payload.user,
    }));
    yield call(resolve, payload);
  } catch (error) {
    // dispatch AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_ERROR action
    yield put(authenticateConfirmAccountTokenError(error));
    yield reject(error);
  }
}

function* authorizeToken(token, resolve, reject) {
  try {
    // send a post request
    const response = yield call(request, '/api/v1/user/authenticateConfirmAccountToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      mode: 'cors',
    });
    // dispatch AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_SUCCESS action
    yield put(authenticateConfirmAccountTokenSuccess(response));
  } catch (err) {
    // redirect to login
    yield put(push('/login'));
    // dispatch AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_ERROR action
    yield put(authenticateConfirmAccountTokenError(err));
    // reject error
    yield reject(err);
  }
}

function* setPasswordFlow() {
  // listen for the SET_PASSWORD_REQUEST action
  const { payload: { data, resolve, reject } } = yield take(SET_PASSWORD_REQUEST);
  try {
    // execute the setNewPassword task asynchronously
    yield fork(setPassword, data, resolve, reject);
    // listen for the SET_PASSWORD_SUCCESS action
    const { payload } = yield take([SET_PASSWORD_SUCCESS]);
    // dispatch action to set user details to app.user
    yield put(setUserState({
      ...payload.user,
    }));
    // set jwt token to localstorage
    yield call(setItem, 'token', payload.token);
    // redirect home
    yield put(push('/'));
    // resolve promise
    yield call(resolve, payload);
  } catch (error) {
    // dispatch SET_PASSWORD_ERROR action
    yield put(setPasswordError(error));
    yield reject(error);
  }
}

function* setPassword(data, resolve, reject) {
  const { password, token } = data;
  try {
    // send post request to create new user
    const response = yield call(request, '/api/v1/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, token }),
      mode: 'cors',
    });
    // dispatch SET_PASSWORD_SUCCESS action
    yield put(setPasswordSuccess(response));
  } catch (err) {
    // dispatch SET_PASSWORD_ERROR action
    yield put(setPasswordError(err));
    // reject error
    yield reject(err);
  }
}
