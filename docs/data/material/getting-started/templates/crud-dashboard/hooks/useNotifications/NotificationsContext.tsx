import * as React from 'react';
import { ShowNotification, CloseNotification } from './useNotifications';

const NotificationsContext = React.createContext<{
  show: ShowNotification;
  close: CloseNotification;
} | null>(null);

export default NotificationsContext;
