import * as React from 'react';
import NotificationBar from '@material-ui/lab/NotificationBar';

function SimpleNotificationBar() {
  return (
    <div>
      <NotificationBar type="error">This is an error message!</NotificationBar>
      <NotificationBar type="warning">This is a warning message!</NotificationBar>
      <NotificationBar type="info">This is an information message!</NotificationBar>
      <NotificationBar type="success">This is a success message!</NotificationBar>
    </div>
  );
}

export default SimpleNotificationBar;
