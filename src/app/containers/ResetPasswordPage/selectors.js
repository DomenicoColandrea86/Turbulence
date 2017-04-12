import { createSelector } from 'reselect';

const selectResetPasswordPageDomain = (state) => state.get('resetPasswordPage');

const selectResetPasswordPage = createSelector(
  selectResetPasswordPageDomain,
  (substate) => substate
);

export {
  selectResetPasswordPage,
};
