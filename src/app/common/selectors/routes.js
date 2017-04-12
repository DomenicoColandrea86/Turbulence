import { createSelector } from 'reselect';
import { get } from 'lodash';

const selectRoutingDomain = (state) => state.get('route');

const selectNextPathname = createSelector(
  selectRoutingDomain,
  (substate) => {
    let nextPathname = false;
    if (get(substate, 'locationBeforeTransitions.state.nextPathname')) {
      nextPathname = substate.locationBeforeTransitions.state.nextPathname;
    }

    return nextPathname;
  }
);

const selectRouting = createSelector(
  selectRoutingDomain,
  (substate) => substate
);

export {
  selectNextPathname,
  selectRouting,
};
