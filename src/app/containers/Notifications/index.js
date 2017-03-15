/**
 * Notifications
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import { selectNotification } from './selectors';
import Notification from '../../components/Notification';

class Notifications extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return <Notification {...this.props} message={this.props.notification.text} />;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    state: {
      ...ownProps.state,
    },
    notification: selectNotification(state),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: {
      ...ownProps.actions,
      ...bindActionCreators(actions, dispatch),
    },
    close() {
      dispatch(actions.hideNotification());
    },
  };
}

Notifications.propTypes = {
  notification: React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)((Notifications));
