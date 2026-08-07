import * as React from 'react';
import { type ShowNotification, type CloseNotification } from './useNotifications';

const NotificationsContext = React.createContext<{
  show: ShowNotification;
  close: CloseNotification;
} | null>(null);

export default NotificationsContext;
