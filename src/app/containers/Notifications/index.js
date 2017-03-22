/**
 * Notifications
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import Notification from '../../components/Notification';

import * as styles from '../../components/Notification/styles.css';

class Notifications extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { notifications, close } = this.props;
    return (
      <div className={styles.notifications_container}>
        {notifications.map((notification, index) =>
          <Notification notification={notification} key={index} close={close} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    state: {
      ...ownProps.state,
    },
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: {
      ...ownProps.actions,
      ...bindActionCreators(actions, dispatch),
    },
    close(notification) {
      dispatch(actions.hideNotification(notification));
    },
  };
}

Notifications.propTypes = {
  notifications: React.PropTypes.any,
  close: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)((Notifications));
