import { createSelector } from 'reselect';

const selectForgotPasswordPageDomain = (state) => state.get('forgotPasswordPage');

const selectForgotPasswordPage = createSelector(
  selectForgotPasswordPageDomain,
  (substate) => substate
);

export {
  selectForgotPasswordPage,
};
