import { createSelector } from 'reselect';

const selectConfirmAccountPageDomain = (state) => state.get('confirmAccountPage');

const selectConfirmAccountPage = createSelector(
  selectConfirmAccountPageDomain,
  (substate) => substate
);

export {
  selectConfirmAccountPage,
};
