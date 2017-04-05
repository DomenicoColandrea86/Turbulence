
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SubmissionError } from 'redux-form/immutable';

import * as actions from './actions';
import schema from './schema';
import validate from '../../utils/validation';
import { selectConfirmAccountPage } from './selectors';
import ConfirmAccountForm from '../../components/ConfirmAccountForm';

class ConfirmAccountPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.authConfirmAccountToken(this.props.params.token);
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-5 col-md-7 mx-auto">
          <h3 className="text-center mb-3">Set your password</h3>
          <p>Create your password and log in to your Turbulence account.</p>
          <ConfirmAccountForm {...this.props} />
        </div>
      </div>
    );
  }
}

ConfirmAccountPage.propTypes = {
  params: React.PropTypes.shape({
    token: React.PropTypes.string.isRequired,
  }),
  authConfirmAccountToken: React.PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    state: {
      ...ownProps.state,
      confirmAccountPage: selectConfirmAccountPage(state),
    },
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: {
      ...ownProps.actions,
      ...bindActionCreators(actions, dispatch),
    },
    authConfirmAccountToken(token) {
      dispatch(actions.authConfirmAccountToken(token));
    },
    onSubmit(formData) {
      const token = ownProps.params.token;
      const data = Object.assign({}, formData.toJS(), { token });
      const errors = validate(data, schema);
      if (!_.isEmpty(errors)) throw new SubmissionError(errors);
      dispatch(actions.setPasswordRequest(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAccountPage);
