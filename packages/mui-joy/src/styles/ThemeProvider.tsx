import * as React from 'react';
import { deepmerge } from '@mui/utils';
import { ThemeProvider as SystemThemeProvider, useTheme as useSystemTheme } from '@mui/system';
import extendTheme, { ThemeInput, ColorSystemInput } from './extendTheme';
import { Theme, RuntimeColorSystem } from './types';

const getThemeWithVars = (
  themeInput?: Omit<ThemeInput, 'colorSchemes'> & ColorSystemInput,
): Theme => {
  const {
    colorSchemes,
    breakpoints,
    spacing,
    getCssVar,
    palette: runtimePalette,
    ...scales
  } = extendTheme(themeInput);
  const colorSchemePalette = deepmerge(
    colorSchemes[runtimePalette?.colorScheme || 'light'].palette,
    runtimePalette,
  );
  const {
    mode = 'light',
    colorScheme = 'light',
    ...palette
  } = colorSchemePalette as RuntimeColorSystem['palette'];

  const defaultTheme = {
    ...scales,
    colorSchemes: {
      ...colorSchemes,
      [colorScheme]: palette,
    },
    palette: {
      ...palette,
      mode,
      colorScheme,
    },
    breakpoints,
    spacing,
    getCssVar,
    vars: { ...scales, palette },
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
