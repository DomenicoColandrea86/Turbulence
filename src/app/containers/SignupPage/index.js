/**
 * SignupPage
 */

import React from 'react';
import Promise from 'bluebird';
import * as _ from 'lodash';
import { SubmissionError } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import schema from './schema';
import * as actions from './actions';
import { selectSignupPage } from './selectors';
import validate from '../../utils/validation';
import SignupForm from '../../components/SignupForm';

class SignupPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    onSubmit(data) {
      const errors = validate(data.toJS(), schema);
      if (!_.isEmpty(errors)) throw new SubmissionError(errors);
      return new Promise((resolve, reject) => {
        dispatch(actions.signupRequest({ data, resolve, reject }));
      }).catch((error) => {
        throw new SubmissionError({ _error: error.message });
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)((SignupPage));
