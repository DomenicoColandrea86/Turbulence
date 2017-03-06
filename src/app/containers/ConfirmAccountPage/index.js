/**
 * ConfirmAccountPage
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import { selectConfirmAccountPage } from './selectors';
import ConfirmAccountForm from '../../components/ConfirmAccountForm';

class ConfirmAccountPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.authenticateConfirmAccountToken(this.props.params.token);
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
  authenticateConfirmAccountToken: React.PropTypes.func.isRequired,
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
    authenticateConfirmAccountToken(token) {
      // handle async tasks with sagas
      return new Promise((resolve, reject) => {
        dispatch(actions.authenticateConfirmAccountToken({ token, resolve, reject }));
      }).then((response) => response)
        .catch((error) => error);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAccountPage);
