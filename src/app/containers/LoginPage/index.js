/**
 * LoginPage
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import { selectLoginPage } from './selectors';
import LoginForm from '../../components/LoginForm';

@connect(mapStateToProps, mapDispatchToProps)
class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = propTypes;

  render() {
    return (
      <div className="row">
        <div className="col-lg-5 col-md-7 mx-auto">
          <h3 className="text-center mb-3">Sign in to your account.</h3>
          <LoginForm {...this.props} />
        </div>
      </div>
    );
  }
}

const propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    state: {
      ...ownProps.state,
      loginPage: selectLoginPage(state),
    },
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: {
      ...ownProps.actions,
      ...bindActionCreators(actions, dispatch),
    },
  };
}

export default LoginPage;
