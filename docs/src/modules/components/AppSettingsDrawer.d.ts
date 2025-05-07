import * as React from 'react';

export interface AppSettingsDrawerProps {
  onClose: () => void;
  open: boolean;
}

declare const AppSettingsDrawer: React.ComponentType<AppSettingsDrawerProps>;

export default AppSettingsDrawer;
