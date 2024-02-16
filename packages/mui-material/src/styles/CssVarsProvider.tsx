// do not remove the following import (https://github.com/microsoft/TypeScript/issues/29808#issuecomment-1320713018)
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import * as React from 'react';
import { SxProps } from '@mui/system';
import createCssVarsProvider, { getInitColorSchemeScript as systemGetInitColorSchemeScript } from '@mui/system/cssVars';
import styleFunctionSx from '@mui/system/styleFunctionSx';
import experimental_extendTheme, {
  SupportedColorScheme,
  CssVarsTheme,
} from './experimental_extendTheme';
import createTypography from './createTypography';
import excludeVariablesFromRoot from './excludeVariablesFromRoot';
import THEME_ID from './identifier';

const defaultTheme = experimental_extendTheme();

const ATTRIBUTE = 'data-mui-color-scheme';
const MODE_KEY = 'mui-mode';
const COLOR_SCHEME_KEY = 'mui-color-scheme';

const { CssVarsProvider, useColorScheme } = createCssVarsProvider<
  SupportedColorScheme,
  typeof THEME_ID
>({
  themeId: THEME_ID,
  theme: defaultTheme,
  attribute: ATTRIBUTE,
  modeStorageKey: MODE_KEY,
  colorSchemeStorageKey: COLOR_SCHEME_KEY,
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  resolveTheme: (theme) => {
    const newTheme = {
      ...theme,
      typography: createTypography(theme.palette, theme.typography),
    };

    newTheme.unstable_sx = function sx(props: SxProps<CssVarsTheme>) {
      return styleFunctionSx({
        sx: props,
        theme: this,
      });
    };

    return newTheme;
  },
  excludeVariablesFromRoot,
});

function getInitColorSchemeScript(...params: Parameters<typeof systemGetInitColorSchemeScript>) {
  return systemGetInitColorSchemeScript({
    attribute:ATTRIBUTE,
    colorSchemeStorageKey: COLOR_SCHEME_KEY,
    defaultMode: 'light',
    defaultLightColorScheme: 'light',
    defaultDarkColorScheme: 'dark',
    modeStorageKey: MODE_KEY,
    ...params,
  })
}

export {
  useColorScheme,
  getInitColorSchemeScript,
  CssVarsProvider as Experimental_CssVarsProvider,
};
