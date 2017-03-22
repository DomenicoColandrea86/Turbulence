import { createSelector } from 'reselect';

const selectState = (state) => state;

const makeSelectNotifications = () => createSelector(
  selectState,
  (state) => state.get('notifications')
);

export {
  makeSelectNotifications,
};
