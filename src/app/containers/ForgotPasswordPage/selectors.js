import { createSelector } from 'reselect';

/**
 * Direct selector to the ForgotPasswordPage state domain
 */
function selectForgotPasswordPageDomain(state) {
  return state.forgotPasswordPage;
}

/**
 * Other specific selectors
 */

/**
 * Public selectors used by ForgotPasswordPage
 */
export const selectForgotPasswordPage = createSelector(
  selectForgotPasswordPageDomain,
  (substate) => substate
);
