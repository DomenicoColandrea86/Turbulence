import { call, put, take, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { Iterable } from 'immutable';

import {
  markRequestPending,
  markRequestSuccess,
  markRequestCancelled,
  markRequestFailed,
} from '../actions';

import {
  removeLoggedUser,
  setLoadingState,
} from '../../containers/App/actions';

import {
  API_TIMEOUT,
} from '../constants';

// create saga here
// convenient way: [] instead of polymorph, such as item is not array then [item]
// because later changes to code will be so easy, just add new row
export const createRequestSaga = ({ request, key, start, stop, success, failure, cancelled, timeout = API_TIMEOUT, cancel }) =>
  function* requestSaga(action) {
    let args;
    if (action.payload) {
      const payload = (Iterable.isIterable(action.payload)) ? action.payload.toJS() : action.payload;
      args = Array.isArray(payload) ? payload : [payload];
    } else {
      // default is empty
      args = [];
    }
    const requestKey = (typeof key === 'function') ? key(...args) : key;
    // for key, we render unique key using action.args
    // but for actionCreator when callback, we should pass the whole action
    // so on event such as success, we can use action.type or action.args to
    // do next, example: addBook => success : (data, {args:[token]}) => loadBooks(token)
    if (start) yield start.map((actionCreator) => put(actionCreator()));
    // mark pending
    yield put(markRequestPending(requestKey));
    yield put(setLoadingState(true));
    try {
      // this is surely Error exception, assume as a request failed
      if (!request) throw new Error('Api method not found!');
      // we do not wait forever for a request
      // timeout is 0 mean default timeout, so default is 0 in case user input 0
      const raceOptions = {
        data: call(request, ...args),
        isTimeout: call(delay, timeout),
      };

      if (cancel) raceOptions.cancelRet = take(cancel);

      const { data, isTimeout, cancelRet } = yield race(raceOptions); // eslint-disable-line redux-saga/no-yield-in-race

      if (isTimeout) {
        throw new Error(`Api method timeout after ${timeout} ms!`);
      } else if (cancelRet) {
        // callback on cancelled
        if (cancelled) yield cancelled.map((actionCreator) => put(actionCreator(cancelRet, action)));
        // mark cancelled request
        yield put(markRequestCancelled(cancelRet, requestKey));
        yield put(setLoadingState(false));
      } else {
        // action creator on success
        if (success) yield success.map((actionCreator) => put(actionCreator(data, action)));
        yield put(markRequestSuccess(requestKey));
        yield put(setLoadingState(false));
      }
    } catch (reason) {
      // unauthorized
      if (reason.status === 401) {
        // call logout user
        yield put(removeLoggedUser());
      }
      // anyway, we should treat this as error to log
      if (failure) yield failure.map((actionCreator) => put(actionCreator(reason, action)));
      yield put(markRequestFailed(reason, requestKey));
      yield put(setLoadingState(false));
    } finally {
      if (stop) yield stop.map((actionCreator) => put(actionCreator(stop, action)));
    }
  };
