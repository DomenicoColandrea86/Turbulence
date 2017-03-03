

/* eslint-disable no-constant-condition, consistent-return */
import { push } from 'react-router-redux';
import { take, call, put, fork } from 'redux-saga/effects';
import { setUserState } from '../App/actions';
import {
  AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN,
  AUTHENTICATE_CONFIRM_ACCOUNT_TOKEN_SUCCESS,
} from './constants';
import {
  authenticateConfirmAccountTokenSuccess,
  authenticateConfirmAccountTokenError,
} from './actions';
import request from '../../utils/request';
import SetPasswordSagas from '../../components/SetPasswordForm/sagas';

// sagas to be loaded
export default [
  authenticateToken,
  ...SetPasswordSagas,
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
