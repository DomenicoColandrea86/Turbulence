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

import * as actions from './actions';
import { logout as Logout } from '../LoginPage/actions';
import { makeSelectUser } from './selectors';
import Header from '../../components/Header';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.loadUserFromToken();
  }

  render() {
    const { user, logout } = this.props;

    return (
      <div>
        <Header {...({ user, logout })} />
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
  // actions: React.PropTypes.object.isRequired,
  user: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.bool]),
  loadUserFromToken: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  logout: Logout,
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: {
      ...ownProps.actions,
      ...bindActionCreators({ ...actions, Logout }, dispatch),
    },
    loadUserFromToken() {
      // handle async tasks with sagas
      return new Promise((resolve, reject) => {
        dispatch(actions.getUserTokenFromLocalstorage({ resolve, reject }));
      }).then((response) => response)
        .catch((error) => error);
    },
    logout() {
      dispatch(Logout());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
