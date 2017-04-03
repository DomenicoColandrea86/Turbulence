/**
 * SignupForm Sagas
 */

/* eslint-disable no-constant-condition, consistent-return */
import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS } from './constants';
import request from '../../utils/request';
import { signupSuccess, signupError } from './actions';
import { setUserState } from '../App/actions';

// Bootstrap sagas
export default [
  signupFlow,
];

function* signupFlow() {
  // listen for the SIGNUP_REQUEST action dispatched on form submit
  const { payload: { data, resolve, reject } } = yield take(SIGNUP_REQUEST);

  try {
    // execute the signup task asynchronously
    yield fork(signup, data, resolve, reject);

    // listen for the SIGNUP_SUCCESS action
    const { payload } = yield take([SIGNUP_SUCCESS]);

    if (payload.success) {
      // dispatch action to set user details to app.user
      // in this case its just the email and isAuthorized flag
      yield put(setUserState({
        ...payload.user,
      }));
      // redirect to
      yield put(push('/account'));
      // resolve promise
      yield call(resolve, payload);
    }
  } catch (error) {
    // dispatch SIGNUP_ERROR action
    yield put(signupError(error));
    yield reject(error);
  }
}

function* signup(data, resolve, reject) {
  try {
    // send a post request with the desired user details
    const response = yield call(request, '/api/v1/user/createTempUserSendVerifyEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      mode: 'cors',
    });

    // dispatch SIGNUP_SUCCESS action
    yield put(signupSuccess(response));
  } catch (err) {
    // reject the onSubmit promise of redux-form
    reject(err);
  }
}
