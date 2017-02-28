/**
 * ResetPasswordPage
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import { selectResetPasswordPage } from './selectors';
import ResetPasswordForm from '../../components/ResetPasswordForm';

class ResetPasswordPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.authenticateResetPasswordToken(this.props.params.token);
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-5 col-md-7 mx-auto">
          <h3 className="text-center mb-3">Reset Password</h3>
          <ResetPasswordForm {...this.props} />
        </div>
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  params: React.PropTypes.shape({
    token: React.PropTypes.string.isRequired,
  }),
  authenticateResetPasswordToken: React.PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    state: {
      ...ownProps.state,
      resetPasswordPage: selectResetPasswordPage(state),
    },
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: {
      ...ownProps.actions,
      ...bindActionCreators(actions, dispatch),
    },
    authenticateResetPasswordToken(token) {
      // handle async tasks with sagas
      return new Promise((resolve, reject) => {
        dispatch(actions.authenticateResetPasswordToken({ token, resolve, reject }));
      }).then((response) => response)
        .catch((error) => error);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
