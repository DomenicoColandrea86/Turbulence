/**
 * SignupPage
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import { selectSignupPage } from './selectors';
import SignupForm from '../../components/SignupForm';

@connect(mapStateToProps, mapDispatchToProps)
class SignupPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = propTypes;

  render() {
    return (
      <div className="row">
        <div className="col-lg-5 col-md-7 mx-auto">
          <h3 className="text-center mb-3">Create your account.</h3>
          <SignupForm {...this.props} />
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
      signupPage: selectSignupPage(state),
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

export default SignupPage;
