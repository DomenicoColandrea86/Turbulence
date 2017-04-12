import { createSelector } from 'reselect';

const selectLoginPageDomain = (state) => state.get('loginPage');

const selectLoginPage = createSelector(
  selectLoginPageDomain,
  (substate) => substate
);

export {
  selectLoginPage,
};
