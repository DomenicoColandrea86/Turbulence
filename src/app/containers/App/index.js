/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';

import * as actions from './actions';
import Models from '../../common/models';
import { makeSelectUser, makeSelectNotifications } from './selectors';
import Header from '../../components/Header';
import Notifications from '../Notifications';
import { getItem } from '../../utils/localStorage';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.loadUserFromToken();
  }

  render() {
    const { user, logout, notifications } = this.props;
    return (
      <div>
        <Header {...({ user, logout })} />
        {notifications.length > 0 && <Notifications notifications={notifications} />}
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {React.Children.toArray(this.props.children)}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  user: ImmutablePropTypes.contains(Models.User).isRequired,
  loadUserFromToken: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
  notifications: React.PropTypes.arrayOf(Models.Notification),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  notifications: makeSelectNotifications(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: {
      ...ownProps.actions,
      ...bindActionCreators({ ...actions }, dispatch),
    },
    loadUserFromToken() {
      const token = getItem('token');
      if (token) dispatch(actions.authFromToken(token));
    },
    logout() {
      dispatch(actions.removeLoggedUser());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
