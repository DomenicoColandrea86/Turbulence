/**
 * ForgotPasswordPage
 */

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubmissionError } from 'redux-form/immutable';

import * as actions from './actions';
import schema from './schema';
import validate from '../../utils/validation';
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
    onSubmit(data) {
      const errors = validate(data.toJS(), schema);
      if (!_.isEmpty(errors)) throw new SubmissionError(errors);
      dispatch(actions.forgotPasswordRequest(data));
    },

  };
}

ForgotPasswordPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
