import * as React from 'react';
import { ShowNotification, CloseNotification } from './useNotifications';

export const NotificationsContext = React.createContext<{
  show: ShowNotification;
  close: CloseNotification;
} | null>(null);
