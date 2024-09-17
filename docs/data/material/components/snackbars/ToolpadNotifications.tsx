import * as React from 'react';
import {
  useNotifications,
  NotificationsProvider,
} from '@toolpad/core/useNotifications';
import Button from '@mui/material/Button';

function NotifyButton() {
  const notifications = useNotifications();
  return (
    <Button
      onClick={() => {
        notifications.show('Consider yourself notified!', {
          autoHideDuration: 3000,
        });
      }}
    >
      Notify me
    </Button>
  );
}

export default function ToolpadNotifications() {
  return (
    <NotificationsProvider>
      <NotifyButton />
    </NotificationsProvider>
  );
}
