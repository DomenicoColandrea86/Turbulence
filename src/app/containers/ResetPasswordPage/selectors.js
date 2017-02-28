import { createSelector } from 'reselect';

/**
 * Direct selector to the ResetPasswordPage state domain
 */
function selectselectResetPasswordPageDomain(state) {
  return state.resetPasswordPage;
}

/**
 * Other specific selectors
 */


/**
 * Public selectors used by ResetPasswordPage
 */
export const selectResetPasswordPage = createSelector(
  selectselectResetPasswordPageDomain,
  (substate) => substate
);
