/**
 * SetPasswordForm Sagas
 */

/* eslint-disable no-constant-condition, consistent-return */
import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from '../../utils/request';
import { setUserState } from '../../containers/App/actions';
import { setItem } from '../../utils/localStorage';

import {
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
} from './constants';
import {
  setPasswordSuccess,
  setPasswordError,
} from './actions';

// Bootstrap sagas
export default [
  setPasswordFlow,
];

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
