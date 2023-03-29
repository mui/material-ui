import * as React from 'react';
import { ThemeProvider as SystemThemeProvider, useTheme as useSystemTheme } from '@mui/system';
import defaultTheme from './defaultTheme';
import extendTheme from './extendTheme';
import IDENTIFIER from './identifier';
import type { CssVarsThemeOptions } from './extendTheme';

export const useTheme = () => {
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
  theme: themeInput,
}: React.PropsWithChildren<{
  theme?: CssVarsThemeOptions | { [k in typeof IDENTIFIER]: CssVarsThemeOptions };
}>) {
  let theme = defaultTheme;
  if (themeInput) {
    theme = extendTheme(IDENTIFIER in themeInput ? themeInput[IDENTIFIER] : themeInput);
  }
  return (
    <SystemThemeProvider
      theme={theme}
      identifier={themeInput && IDENTIFIER in themeInput ? IDENTIFIER : undefined}
    >
      {children}
    </SystemThemeProvider>
  );
}
