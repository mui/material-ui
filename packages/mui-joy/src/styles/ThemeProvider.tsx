import * as React from 'react';
import { ThemeProvider as SystemThemeProvider, useTheme as useSystemTheme } from '@mui/system';
import defaultTheme from './defaultTheme';
import extendTheme from './extendTheme';
import type { CssVarsThemeOptions } from './extendTheme';

export const useTheme = () => {
  const theme = useSystemTheme(defaultTheme, '$$joy');

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }

  // @ts-ignore internal logic
  return theme.$$joy || theme;
};

export default function ThemeProvider({
  children,
  theme: themeInput,
  enableThemeScope,
}: React.PropsWithChildren<{
  theme?: CssVarsThemeOptions;
  /**
   * If `true`, the theme scope is created to prevent conflict with other libraries's theme
   * that use emotion or styled-components
   */
  enableThemeScope?: boolean;
}>) {
  return (
    <SystemThemeProvider
      identifier="$$joy"
      enableThemeScope={enableThemeScope}
      theme={themeInput ? extendTheme(themeInput) : defaultTheme}
    >
      {children}
    </SystemThemeProvider>
  );
}
