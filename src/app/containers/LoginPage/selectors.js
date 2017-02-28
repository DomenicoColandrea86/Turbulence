import { createSelector } from 'reselect';

/**
 * Direct selector to the LoginPage state domain
 */
function selectLoginPageDomain(state) {
  return state.loginPage;
}

/**
 * Other specific selectors
 */


/**
 * Public selectors used by LoginPage
 */
export const selectLoginPage = createSelector(
  selectLoginPageDomain,
  (substate) => substate
);
