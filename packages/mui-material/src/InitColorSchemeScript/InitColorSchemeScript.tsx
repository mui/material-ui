import * as React from 'react';
import SystemInitColorSchemeScript from '@mui/system/InitColorSchemeScript';

export const defaultConfig = {
  attribute: 'data-mui-color-scheme',
  colorSchemeStorageKey: 'mui-color-scheme',
  defaultLightColorScheme: 'light',
  defaultDarkColorScheme: 'dark',
  modeStorageKey: 'mui-mode',
} as const;
/**
 *
 * Demos:
 *
 * - [InitColorSchemeScript](https://mui.com/material-ui/react-init-color-scheme-script/)
 *
 * API:
 *
 * - [InitColorSchemeScript API](https://mui.com/material-ui/api/init-color-scheme-script/)
 */
export default (function InitColorSchemeScript(props) {
  return <SystemInitColorSchemeScript {...defaultConfig} {...props} />;
} as typeof SystemInitColorSchemeScript);
