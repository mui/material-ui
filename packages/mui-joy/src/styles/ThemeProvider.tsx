import * as React from 'react';
import { ThemeProvider as SystemThemeProvider, useTheme as useSystemTheme } from '@mui/system';
import defaultTheme from './defaultTheme';
import extendTheme from './extendTheme';
import type { CssVarsThemeOptions } from './extendTheme';

export const useTheme = () => {
  const theme = useSystemTheme(defaultTheme);

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
}: React.PropsWithChildren<{
  theme?: CssVarsThemeOptions;
}>) {
  return (
    <SystemThemeProvider theme={themeInput ? extendTheme(themeInput) : defaultTheme}>
      {children}
    </SystemThemeProvider>
  );
}
