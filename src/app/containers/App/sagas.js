/**
 * App Sagas
 */

/* eslint-disable no-constant-condition, consistent-return */
import { push } from 'react-router-redux';
import { take, call, put, join, fork, select } from 'redux-saga/effects';
import {
  GET_USER_TOKEN_FROM_LOCALSTORAGE,
  AUTHENTICATE_FROM_TOKEN,
  AUTHENTICATE_FROM_TOKEN_SUCCESS,
  AUTHENTICATE_FROM_TOKEN_ERROR,
} from './constants';
import {
  authenticateFromToken,
  authenticateFromTokenSuccess,
  authenticateFromTokenError,
  setUserState,
} from './actions';
import request from '../../utils/request';
import { getItem } from '../../utils/localStorage';
import { selectNextPathname } from '../../common/selectors/router.selector';

// Bootstrap sagas
export default [
  rootSaga,
];

// app root saga
function* rootSaga() {
  // yield array of forks -> array of tasks
  const taskList = yield [
    fork(loadToken),
    fork(authenticateToken),
  ];
  // yield array of joins -> will return after all tasks terminate
  // https://github.com/redux-saga/redux-saga/issues/13#issuecomment-169179962
  yield taskList.map(join);
}

// load token
function* loadToken() {
  const { payload: { resolve, reject } } = yield take(GET_USER_TOKEN_FROM_LOCALSTORAGE);
  try {
    // retrieve token from local storage
    const token = yield call(getToken);
    // if there is no token, dont bother
    if (!token || token === '') return resolve('No Token to authenticate.');
    // dispatch AUTHENTICATE_FROM_TOKEN action
    yield put(authenticateFromToken({ token, resolve, reject }));
  } catch (error) {
    // dispatch AUTHENTICATE_FROM_TOKEN_ERROR action
    yield put(authenticateFromTokenError(error));
    yield reject(error);
  }
}

// authenticate token
function* authenticateToken() {
  try {
    // listen for the LOGIN_REQUEST action dispatched on form submit
    const { payload: { token, resolve, reject } } = yield take(AUTHENTICATE_FROM_TOKEN);

    // execute the reauthenticate task asynchronously
    yield fork(reauthenticate, token, resolve, reject);
    // listen for the AUTHENTICATE_FROM_TOKEN_SUCCESS action
    const { payload } = yield take([AUTHENTICATE_FROM_TOKEN_SUCCESS]);

    // resolve promise
    yield call(resolve, payload);

    // listen for the AUTHENTICATE_FROM_TOKEN_ERROR action
    yield take([AUTHENTICATE_FROM_TOKEN_ERROR]);
  } catch (error) {
    // dispatch AUTHENTICATE_FROM_TOKEN_ERROR action
    yield put(authenticateFromTokenError(error));
  }
}

// reauthenticate token
function* reauthenticate(token, resolve, reject) {
  try {
    // send a post request with the login credentials
    const response = yield call(request, '/api/v1/user/reauthenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      mode: 'cors',
    });

    // dispatch action to set user details to app.user
    yield put(setUserState({
      ...response.user,
    }));

    // redirect to nextPathName or to the profile page
    const nextPathName = yield select(selectNextPathname);

    if (nextPathName) {
      yield put(push(nextPathName));
    } else {
      yield put(push('/'));
    }

    // dispatch AUTHENTICATE_FROM_TOKEN_SUCCESS action
    yield put(authenticateFromTokenSuccess(response));
  } catch (error) {
    // dispatch AUTHENTICATE_FROM_TOKEN_ERROR action
    yield put(authenticateFromTokenError(error));
    // reject error
    yield reject(error);
  }
}

function getToken() {
  return getItem('token');
}
