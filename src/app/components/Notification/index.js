import React from 'react';
import * as styles from './styles.css';
import Models from '../../common/models';

const NotificationComponent = function NotificationComponent({ notification, close }) {
  const notificationClass = [
    'alert',
    'alert-dismissible',
    'fade',
    `alert-${notification.type}`,
    `${styles.notification}`,
  ].join(' ');
  return (
    <div className={styles.notification_container}>
      <div className={notificationClass} role="alert">
        <button type="button" className="close" onClick={(evt) => { evt.preventDefault(); close(notification); }}>
          <span>&times;</span>
        </button>
        <strong>{notification.message}</strong>
      </div>
    </div>
  );
};

NotificationComponent.propTypes = {
  notification: React.PropTypes.objectOf(Models.Notification).isRequired,
  close: React.PropTypes.func,
};

export default NotificationComponent;

