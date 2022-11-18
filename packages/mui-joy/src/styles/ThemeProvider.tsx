import * as React from 'react';
import {
  ThemeProvider as SystemThemeProvider,
  unstable_styleFunctionSx as styleFunctionSx,
  useTheme as useSystemTheme,
} from '@mui/system';
import { SxProps } from './types';
import defaultTheme, { getThemeWithVars } from './defaultTheme';
import type { CssVarsThemeOptions } from './extendTheme';

export const useTheme = () => {
  return useSystemTheme(defaultTheme);
};

const getTheme = (themeInput: CssVarsThemeOptions) => {
  const theme = getThemeWithVars(themeInput);
  theme.unstable_sx = function sx(props: SxProps) {
    return styleFunctionSx({ sx: props, theme: this });
  };

  return theme;
};

export default function ThemeProvider({
  children,
  theme: themeInput,
}: React.PropsWithChildren<{
  theme?: CssVarsThemeOptions;
}>) {
  return (
    <SystemThemeProvider theme={themeInput ? getTheme(themeInput) : defaultTheme}>
      {children}
    </SystemThemeProvider>
  );
}
