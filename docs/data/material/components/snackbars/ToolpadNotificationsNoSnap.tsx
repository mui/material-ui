import * as React from 'react';
import {
  useNotifications,
  NotificationsProvider,
} from '@toolpad/core/useNotifications';
import Button from '@mui/material/Button';

function NotifyButton() {
  const notifications = useNotifications();
  const [online, setOnline] = React.useState(true);
  const prevOnline = React.useRef(online);
  React.useEffect(() => {
    if (prevOnline.current === online) {
      return () => {};
    }
    prevOnline.current = online;

    // preview-start
    const key = online
      ? notifications.show('You are now online', {
          severity: 'success',
          autoHideDuration: 3000,
        })
      : notifications.show('You are now offline', {
          severity: 'error',
        });

    return () => {
      notifications.close(key);
    };
    // preview-end
  }, [notifications, online]);

  return <Button onClick={() => setOnline((prev) => !prev)}>Notify</Button>;
}

export default function ToolpadNotificationsNoSnap() {
  return (
    <NotificationsProvider>
      <NotifyButton />
    </NotificationsProvider>
  );
}
