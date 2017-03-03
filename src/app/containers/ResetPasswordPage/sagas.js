
/* eslint-disable no-constant-condition, consistent-return */
import { push } from 'react-router-redux';
import { take, call, put, fork } from 'redux-saga/effects';
import {
  AUTHENTICATE_RESET_PASSWORD_TOKEN,
  AUTHENTICATE_RESET_PASSWORD_TOKEN_SUCCESS,
} from './constants';
import {
  authenticateResetPasswordTokenSuccess,
  authenticateResetPasswordTokenError,
} from './actions';
import request from '../../utils/request';
import ResetPasswordFormSagas from '../../components/ResetPasswordForm/sagas';

// sagas to be loaded
export default [
  authenticateToken,
  ...ResetPasswordFormSagas,
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
