
import React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubmissionError } from 'redux-form/immutable';

import schema from './schema';
import * as actions from './actions';
import { selectResetPasswordPage } from './selectors';
import validate from '../../utils/validation';
import ResetPasswordForm from '../../components/ResetPasswordForm';

class ResetPasswordPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.authResetPasswordToken(this.props.params.token);
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
    authResetPasswordToken(token) {
      dispatch(actions.authResetPasswordToken(token));
    },
    onSubmit(formData) {
      const token = ownProps.params.token;
      const data = Object.assign({}, formData.toJS(), { token });
      const errors = validate(data, schema);
      if (!_.isEmpty(errors)) throw new SubmissionError(errors);
      dispatch(actions.resetPasswordRequest(data));
    },
  };
}

ResetPasswordPage.propTypes = {
  params: React.PropTypes.shape({
    token: React.PropTypes.string.isRequired,
  }),
  authResetPasswordToken: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
