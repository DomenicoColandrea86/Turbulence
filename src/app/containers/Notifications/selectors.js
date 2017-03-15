import { createSelector } from 'reselect';

/**
 * Direct selector to the Notification state domain
 */
function selectNotificationDomain(state) {
  const notificationState = state.toJS();
  console.log('state ', notificationState.notification);
  return notificationState.notification;
}

/**
 * Other specific selectors
 */


/**
 * Public selectors used by Notification container
 */
export const selectNotification = createSelector(
  selectNotificationDomain,
  (substate) => substate
);
