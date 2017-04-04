
import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import api from '../../common/api';
import { signupSuccess, signupError } from './actions';
import { SIGNUP_REQUEST } from './constants';
import { setUserState } from '../App/actions';
import { createRequestSaga } from '../../common/sagas';
import { REMOVE_LOGGED_USER } from '../../containers/App/constants';

const requestSignupAsync = createRequestSaga({
  request: api.user.signup,
  key: 'signup',
  cancel: REMOVE_LOGGED_USER,
  success: [
    (response) => signupSuccess(response),
    (response) => setUserState(response.user),
    () => push('/account'),
  ],
  failure: [
    (error) => signupError(error),
  ],
});


const asyncWatchers = [
  function* asyncSignupWatcher() {
    yield [
      yield takeLatest(SIGNUP_REQUEST, requestSignupAsync),
    ];
  },
];

// root saga reducer
const rootSaga = function* rootSaga() {
  yield [
    ...asyncWatchers.map((watcher) => fork(watcher)),
  ];
};

export default [
  rootSaga,
];
