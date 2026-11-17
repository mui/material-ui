'use client';
import styleFunctionSx from '@mui/system/styleFunctionSx';
import type { SxProps } from '@mui/system';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import type { SupportedColorScheme, CssVarsTheme } from './createThemeWithVars';
import createTypography from './createTypography';
import THEME_ID from './identifier';
import { defaultConfig } from '../InitColorSchemeScript/InitColorSchemeScript';

const { CssVarsProvider, useColorScheme } = createCssVarsProvider<
  SupportedColorScheme,
  typeof THEME_ID
>({
  themeId: THEME_ID,
  // `ThemeProvider` always passes a theme, so no default theme is needed.
  theme: {},
  colorSchemeStorageKey: defaultConfig.colorSchemeStorageKey,
  modeStorageKey: defaultConfig.modeStorageKey,
  defaultColorScheme: {
    light: defaultConfig.defaultLightColorScheme,
    dark: defaultConfig.defaultDarkColorScheme,
  },
  resolveTheme: (theme) => {
    const newTheme = {
      ...theme,
      typography: createTypography(theme.palette, theme.typography),
    };

    newTheme.unstable_sx = function sx(props: SxProps<CssVarsTheme>) {
      return styleFunctionSx({ sx: props, theme: this });
    };

    return newTheme;
  },
});

// `CssVarsProvider` is internal: `ThemeProvider` renders it when the theme has `colorSchemes`.
export { CssVarsProvider, useColorScheme };
