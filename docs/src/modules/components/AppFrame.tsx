import * as React from 'react';
import {
  AppFrame as AppFrameBase,
  DeferredAppSearch,
  HEIGHT,
  type AppFrameProps as AppFrameBaseProps,
  type NotificationMessage,
} from '@mui/internal-core-docs/AppLayout';
import AppFrameBanner from 'docs/src/components/banner/AppFrameBanner';
import { DemoPageThemeProvider } from 'docs/src/theming';

export { DeferredAppSearch, HEIGHT };
export type { NotificationMessage };

async function fetchNotifications(): Promise<NotificationMessage[]> {
  if (process.env.NODE_ENV !== 'production') {
    const items = (await import('../../../notifications.json')).default;
    return items;
  }
  // #target-branch-reference
  const response = await fetch(
    'https://raw.githubusercontent.com/mui/material-ui/master/docs/notifications.json',
  );
  return response.json();
}

export interface AppFrameProps extends Omit<AppFrameBaseProps, 'fetchNotifications'> {}

export default function AppFrame(props: AppFrameProps) {
  const { BannerComponent = AppFrameBanner, ...other } = props;
  return (
    <DemoPageThemeProvider>
      <AppFrameBase
        BannerComponent={BannerComponent}
        fetchNotifications={fetchNotifications}
        {...other}
      />
    </DemoPageThemeProvider>
  );
}
