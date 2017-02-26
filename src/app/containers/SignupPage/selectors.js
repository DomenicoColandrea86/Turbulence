import { createSelector } from 'reselect';

/**
 * Direct selector to the authPage state domain
 */
function selectSignupPageDomain(state) {
  return state.authPage;
}

/**
 * Other specific selectors
 */


/**
 * Public selectors used by AuthPage
 */
export const selectSignupPage = createSelector(
  selectSignupPageDomain,
  (substate) => substate
);
