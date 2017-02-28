import { createSelector } from 'reselect';

/**
 * Direct selector to the SignupPage state domain
 */
function selectSignupPageDomain(state) {
  return state.signupPage;
}

/**
 * Other specific selectors
 */


/**
 * Public selectors used by SignupPage
 */
export const selectSignupPage = createSelector(
  selectSignupPageDomain,
  (substate) => substate
);
