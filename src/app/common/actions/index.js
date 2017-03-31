import { browserHistory } from 'react-router';

import {
  LOG,
  NOOP,
  INVOKE_CALLBACK,
  MARK_REQUEST_PENDING,
  MARK_REQUEST_SUCCESS,
  MARK_REQUEST_FAILED,
  MARK_REQUEST_CANCELLED,
} from '../constants';

// do nothing
export const noop = (explanation) => ({
  type: NOOP,
  payload: explanation,
});

// do callback and get result as payload
export const invokeCallback = (callback, ...args) => ({
  type: INVOKE_CALLBACK,
  payload: callback && callback.call(null, ...args),
});

export const log = (data, type = 'table') => {
  console[type](data);
  return {
    type: LOG,
    payload: data,
  };
};

// helper function to abstract going to different pages
export const forwardTo = (location) => {
  browserHistory.push(location);
  return noop(`Go to: ${location}`);
};

// mark request for later checking
export const markRequestPending = (key) => ({
  type: MARK_REQUEST_PENDING,
  meta: { key },
});

export const markRequestSuccess = (key) => ({
  type: MARK_REQUEST_SUCCESS,
  meta: { key },
});

export const markRequestCancelled = ({ type, reason }, key) => ({
  type: MARK_REQUEST_CANCELLED,
  payload: `${type}: ${reason || 'called'}`,
  meta: { key },
});

// failed need a reason, because we do not know why !!!
export const markRequestFailed = (reason, key) => ({
  type: MARK_REQUEST_FAILED,
  payload: reason,
  meta: { key },
});
