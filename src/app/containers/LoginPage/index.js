/**
 * LoginPage
 */

import React from 'react';
import * as _ from 'lodash';
import Promise from 'bluebird';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubmissionError } from 'redux-form/immutable';

import schema from './schema';
import * as actions from './actions';
import { selectLoginPage } from './selectors';
import validate from '../../utils/validation';
import LoginForm from '../../components/LoginForm';
import { showSuccessNotification, showErrorNotification } from '../Notifications/actions';

class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    onSubmit(data) {
      const errors = validate(data.toJS(), schema);
      if (!_.isEmpty(errors)) throw new SubmissionError(errors);
      return new Promise((resolve, reject) => {
        dispatch(actions.loginRequest({ data, resolve, reject }));
      }).then((response) => {
        console.log('response: ', response);
        dispatch(showSuccessNotification(response.msg));
      }).catch((error) => {
        dispatch(showErrorNotification(error.msg));
        throw new SubmissionError({ _error: error.msg });
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)((LoginPage));
