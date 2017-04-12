import { Record } from 'immutable';

export const User = new Record({
  _id: null,
  create_dt: null,
  modified_dt: null,
  email: '',
  isAuthorized: false,
  firstName: '',
  lastName: '',
}, 'User');

export default User;
