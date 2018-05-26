import * as React from 'react';
import NotificationBar from '@material-ui/lab/NotificationBar';

function WithoutIconNotificationBar() {
  return (
    <div>
      <NotificationBar showIcon={false} type="error">
        This is an error message!
      </NotificationBar>
      <NotificationBar showIcon={false} type="warning">
        This is a warning message!
      </NotificationBar>
      <NotificationBar showIcon={false} type="info">
        This is an information message!
      </NotificationBar>
      <NotificationBar showIcon={false} type="success">
        This is a success message!
      </NotificationBar>
    </div>
  );
}

export default WithoutIconNotificationBar;
