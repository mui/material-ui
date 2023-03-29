import * as React from 'react';
import { ThemeProvider as SystemThemeProvider, useTheme as useSystemTheme } from '@mui/system';
import defaultTheme from './defaultTheme';
import IDENTIFIER from './identifier';
import type { Theme } from './types';

export const useTheme = (): Theme => {
  const theme = useSystemTheme(defaultTheme);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }

  // @ts-ignore internal logic
  return theme[IDENTIFIER] || theme;
};

export default function ThemeProvider({
  children,
  theme: themeInput = defaultTheme,
}: React.PropsWithChildren<{
  theme?: Theme | { [k in typeof IDENTIFIER]: Theme };
}>) {
  const scopedTheme = (themeInput as any)[IDENTIFIER];
  return (
    <SystemThemeProvider
      identifier={scopedTheme ? IDENTIFIER : undefined}
      theme={scopedTheme || themeInput}
    >
      {children}
    </SystemThemeProvider>
  );
}
