import * as React from 'react';
import NotificationsContext from './NotificationsContext';

export interface ShowNotificationOptions {
  /**
   * The key to use for deduping notifications. If not provided, a unique key will be generated.
   */
  key?: string;
  /**
   * The severity of the notification. When provided, the snackbar will show an alert with the
   * specified severity.
   */
  severity?: 'info' | 'warning' | 'error' | 'success';
  /**
   * The duration in milliseconds after which the notification will automatically close.
   */
  autoHideDuration?: number;
  /**
   * The text to display on the action button.
   */
  actionText?: React.ReactNode;
  /**
   * The callback to call when the action button is clicked.
   */
  onAction?: () => void;
}

export interface ShowNotification {
  /**
   * Show a snackbar in the application.
   *
   * @param message The message to display in the snackbar.
   * @param options Options for the snackbar.
   * @returns The key that represents the notification. Useful for programmatically
   * closing it.
   */
  (message: React.ReactNode, options?: ShowNotificationOptions): string;
}

export interface CloseNotification {
  /**
   * Close a snackbar in the application.
   *
   * @param key The key of the notification to close.
   */
  (key: string): void;
}

interface UseNotifications {
  show: ShowNotification;
  close: CloseNotification;
}

export default function useNotifications(): UseNotifications {
  const notificationsContext = React.useContext(NotificationsContext);
  if (!notificationsContext) {
    throw new Error('Notifications context was used without a provider.');
  }
  return notificationsContext;
}
