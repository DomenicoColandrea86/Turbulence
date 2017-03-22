import React from 'react';
import * as styles from './styles.css';

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
  notification: React.PropTypes.shape({
    id: React.PropTypes.string,
    type: React.PropTypes.string,
    message: React.PropTypes.string,
  }),
  close: React.PropTypes.func,
};

export default NotificationComponent;

