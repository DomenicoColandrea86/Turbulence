/* eslint-disable no-constant-condition, consistent-return */

import { take, call, join, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from './constants';

import request from '../../utils/request';
import { loginError, loginSuccess } from './actions';
import { setUserState } from '../../containers/App/actions';
import { setItem, removeItem } from '../../utils/localStorage';

// All sagas to be loaded
export default [
  rootSaga,
];

// app root saga
function* rootSaga() {
  // yield array of forks -> array of tasks
  const taskList = yield [
    fork(loginFlow),
    fork(logoutFlow),
  ];
  // yield array of joins -> will return after all tasks terminate
  // https://github.com/redux-saga/redux-saga/issues/13#issuecomment-169179962
  yield taskList.map(join);
}

function* loginFlow() {
  // listen for the LOGIN_REQUEST action
  const { payload: { data, resolve, reject } } = yield take(LOGIN_REQUEST);
  try {
    // execute the authorize task asynchronously
    yield fork(authorize, data, resolve, reject);
    // listen for the LOGIN_SUCCESS action
    const { payload } = yield take([LOGIN_SUCCESS]);
    // resolve promise
    yield call(resolve, payload);
  } catch (error) {
    // dispatch LOGIN_ERROR action
    yield put(loginError(error));
    yield reject(error);
  }
}

function* logoutFlow() {
  while (true) {
    // listen for the LOGOUT action
    const logout = yield take([LOGOUT]);
    if (logout) {
      // dispatch action to reset user details
      yield put(setUserState(false));
      // remove jwt token from localstorage
      yield call(removeItem, 'token');
      // redirect to home page
      yield put(push('/login'));
    }
  }
}

function* authorize(data, resolve, reject) {
  try {
    // send a post request with the login credentials
    const response = yield call(request, '/api/v1/user/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      mode: 'cors',
    });
    if (!response.success) throw response;
    // dispatch LOGIN_SUCCESS action
    yield put(loginSuccess(response));
    // dispatch action to set user details to app.currentUser
    yield put(setUserState({
      ...response.user,
    }));
    // set jwt token to localstorage
    yield call(setItem, 'token', response.token);
    yield put(push('/'));
  } catch (err) {
    // dispatch LOGIN_ERROR action
    yield put(loginError(err));
    // reject form error
    yield reject(err);
  }
}
