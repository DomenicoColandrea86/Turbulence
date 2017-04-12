import { Record } from 'immutable';

export const Notification = new Record({
  message: '',
  type: '',
  id: '',
}, 'Notification');

export default Notification;
