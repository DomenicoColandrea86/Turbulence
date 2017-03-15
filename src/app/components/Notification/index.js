import React from 'react';
import { NOTIFICATION_STATUS_SHOW } from '../../containers/Notifications/constants';
import * as styles from './styles.css';

const NotificationComponent = function NotificationComponent({ notification, close }) {
  const notificationClass = [
    'alert',
    'alert-dismissible',
    'fade',
    `${notification.type !== '' ? `alert-${notification.type}` : ''}`,
    `${notification.status === NOTIFICATION_STATUS_SHOW ? 'show' : ''}`,
  ].join(' ');

  console.log('notificationClass ', notificationClass);
  return (
    <div className={styles.notification_container}>
      <div className={notificationClass} role="alert">
        <button type="button" className="close" onClick={(evt) => { evt.preventDefault(); close(notification); }}>
          <span>&times;</span>
        </button>
        <strong>{notification.text}</strong>
      </div>
    </div>
  );
};

NotificationComponent.propTypes = {
  notification: React.PropTypes.shape({
    text: React.PropTypes.string,
    icon: React.PropTypes.string,
    type: React.PropTypes.string,
    status: React.PropTypes.string,
  }),
  close: React.PropTypes.func,
};

export default NotificationComponent;

