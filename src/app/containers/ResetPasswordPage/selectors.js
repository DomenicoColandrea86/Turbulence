import { createSelector } from 'reselect';

/**
 * Direct selector to the ResetPasswordPage state domain
 */
function selectResetPasswordPageDomain(state) {
  return state.resetPasswordPage;
}

/**
 * Public selectors used by ResetPasswordPage
 */
export const selectResetPasswordPage = createSelector(
  selectResetPasswordPageDomain,
  (substate) => substate
);
