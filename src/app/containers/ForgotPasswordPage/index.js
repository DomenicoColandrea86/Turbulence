/**
 * ForgotPasswordPage
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import { selectForgotPasswordPage } from './selectors';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';

class ForgotPasswordPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="row">
        <div className="col-lg-5 col-md-7 mx-auto">
          <h3 className="text-center mb-3">Reset Password</h3>
          <ForgotPasswordForm {...this.props} />
        </div>
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    state: {
      ...ownProps.state,
      forgotPasswordPage: selectForgotPasswordPage(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
