'use client';
import styleFunctionSx from '@mui/system/styleFunctionSx';
import { unstable_createCssVarsProvider as createCssVarsProvider, SxProps } from '@mui/system';
import { SupportedColorScheme, CssVarsTheme } from './createThemeWithVars';
import createTheme from './createTheme';
import createTypography from './createTypography';
import THEME_ID from './identifier';
import { defaultConfig } from '../InitColorSchemeScript/InitColorSchemeScript';

const {
  CssVarsProvider: InternalCssVarsProvider,
  useColorScheme,
} = createCssVarsProvider<SupportedColorScheme, typeof THEME_ID>({
  themeId: THEME_ID,
  // @ts-ignore ignore module augmentation tests
  theme: () => createTheme({ cssVariables: true }),
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

export { useColorScheme };

export { InternalCssVarsProvider };
