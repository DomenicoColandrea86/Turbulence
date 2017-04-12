import { createSelector } from 'reselect';

const selectSignupPageDomain = (state) => state.get('signupPage');

const selectSignupPage = createSelector(
  selectSignupPageDomain,
  (substate) => substate
);

export {
  selectSignupPage,
};
