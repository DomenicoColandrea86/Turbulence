import { createSelector } from 'reselect';

/**
 * Direct selector to the ConfirmAccountPage state domain
 */
function selectConfirmAccountPageDomain(state) {
  return state.confirmAccountPage;
}

/**
 * Other specific selectors
 */


/**
 * Public selectors used by ConfirmAccountPage
 */
export const selectConfirmAccountPage = createSelector(
  selectConfirmAccountPageDomain,
  (substate) => substate
);
