import * as React from 'react';
import { ThemeProvider as SystemThemeProvider, useTheme as useSystemTheme } from '@mui/system';
import extendTheme, { Theme, ThemeInput } from './extendTheme';

const getThemeWithVars = (themeInput?: ThemeInput): Theme => {
  const { colorSchemes, breakpoints, spacing, getCssVar, ...scales } = extendTheme(themeInput);
  const defaultTheme = {
    ...scales,
    ...colorSchemes.light,
    colorSchemes,
    breakpoints,
    spacing,
    getCssVar,
    vars: { ...scales, ...colorSchemes.light },
  };
  return defaultTheme;
};

export const useTheme = () => {
  return useSystemTheme(getThemeWithVars());
};

export default function ThemeProvider({
  children,
  theme: themeInput,
}: React.PropsWithChildren<{
  theme?: ThemeInput;
}>) {
  return <SystemThemeProvider theme={getThemeWithVars(themeInput)}>{children}</SystemThemeProvider>;
}
