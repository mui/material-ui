// do not remove the following import (https://github.com/microsoft/TypeScript/issues/29808#issuecomment-1320713018)
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import * as React from 'react';
import { SxProps } from '@mui/system';
import createCssVarsProvider from '@mui/system/cssVars';
import styleFunctionSx from '@mui/system/styleFunctionSx';
import experimental_extendTheme, {
  SupportedColorScheme,
  CssVarsTheme,
} from './experimental_extendTheme';
import createTypography from './createTypography';
import excludeVariablesFromRoot from './excludeVariablesFromRoot';
import THEME_ID from './identifier';
import { CONSTANT } from './getInitColorSchemeScript';

const defaultTheme = experimental_extendTheme();

const { CssVarsProvider, useColorScheme } = createCssVarsProvider<
  SupportedColorScheme,
  typeof THEME_ID
>({
  themeId: THEME_ID,
  theme: defaultTheme,
  attribute: CONSTANT.ATTRIBUTE,
  modeStorageKey: CONSTANT.MODE_KEY,
  colorSchemeStorageKey: CONSTANT.COLOR_SCHEME_KEY,
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

export { useColorScheme, CssVarsProvider as Experimental_CssVarsProvider };
