import { createSelector } from 'reselect';

/**
 * Direct selector to the authPage state domain
 */
function selectLoginPageDomain(state) {
  return state.loginPage;
}

/**
 * Other specific selectors
 */


/**
 * Public selectors used by AuthPage
 */
export const selectLoginPage = createSelector(
  selectLoginPageDomain,
  (substate) => substate
);
