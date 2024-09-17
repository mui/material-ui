import * as React from 'react';
import {
  useNotifications,
  NotificationsProvider,
} from '@toolpad/core/useNotifications';
import Button from '@mui/material/Button';

export default function ToolpadNotifications() {
  const notifications = useNotifications();
  return (
    <NotificationsProvider>
      <div>
        <Button
          onClick={() => {
            // preview-start
            notifications.show('Consider yourself notified!', {
              autoHideDuration: 3000,
            });
            // preview-end
          }}
        >
          Notify me
        </Button>
      </div>
    </NotificationsProvider>
  );
}
