'use client';
import * as React from 'react';
import { ThemeProvider as SystemThemeProvider, useTheme as useSystemTheme } from '@mui/system';
import defaultTheme from './defaultTheme';
import extendTheme from './extendTheme';
import THEME_ID from './identifier';
import type { Theme } from './types';
import type { CssVarsThemeOptions } from './extendTheme';

export const useTheme = (): Theme => {
  const theme = useSystemTheme(defaultTheme);

  if (process.env.NODE_ENV !== 'production') {
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- process.env never changes
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }

  // @ts-ignore internal logic
  return theme[THEME_ID] || theme;
};

export default function ThemeProvider({
  children,
  theme: themeInput,
}: React.PropsWithChildren<{
  theme?: CssVarsThemeOptions | { [k in typeof THEME_ID]: CssVarsThemeOptions };
}>) {
  let theme = defaultTheme;
  if (themeInput) {
    theme = extendTheme(THEME_ID in themeInput ? themeInput[THEME_ID] : themeInput);
  }
  return (
    <SystemThemeProvider
      theme={theme}
      themeId={themeInput && THEME_ID in themeInput ? THEME_ID : undefined}
    >
      {children}
    </SystemThemeProvider>
  );
}
