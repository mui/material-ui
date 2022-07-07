import * as React from 'react';
import { ThemeProvider as SystemThemeProvider, useTheme as useSystemTheme } from '@mui/system';
import defaultTheme, { getThemeWithVars } from './defaultTheme';
import type { CssVarsThemeOptions } from './extendTheme';

export const useTheme = () => {
  return useSystemTheme(defaultTheme);
};

export default function ThemeProvider({
  children,
  theme: themeInput,
}: React.PropsWithChildren<{
  theme?: CssVarsThemeOptions;
}>) {
  return (
    <SystemThemeProvider theme={themeInput ? getThemeWithVars(themeInput) : defaultTheme}>
      {children}
    </SystemThemeProvider>
  );
}
