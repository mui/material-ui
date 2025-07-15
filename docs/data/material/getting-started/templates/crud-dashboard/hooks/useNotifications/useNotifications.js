import * as React from 'react';
import NotificationsContext from './NotificationsContext';

export default function useNotifications() {
  const notificationsContext = React.useContext(NotificationsContext);
  if (!notificationsContext) {
    throw new Error('Notifications context was used without a provider.');
  }
  return notificationsContext;
}
