// API
export const API_BASE = process.env.NODE_ENV === 'development' ? `//${location.hostname}:3000` : '';
export const API_TIMEOUT = 10000;

// Actions
export const NOOP = 'NOOP';
export const LOG = 'LOG';
export const INVOKE_CALLBACK = 'INVOKE_CALLBACK';
export const MARK_REQUEST_PENDING = 'MARK_REQUEST_PENDING';
export const MARK_REQUEST_CANCELLED = 'MARK_REQUEST_CANCELLED';
export const MARK_REQUEST_SUCCESS = 'MARK_REQUEST_SUCCESS';
export const MARK_REQUEST_FAILED = 'MARK_REQUEST_FAILED';
