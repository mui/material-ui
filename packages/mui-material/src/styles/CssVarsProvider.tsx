'use client';
// do not remove the following import (https://github.com/microsoft/TypeScript/issues/29808#issuecomment-1320713018)
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
import * as React from 'react';
import { unstable_createCssVarsProvider as createCssVarsProvider, SxProps } from '@mui/system';
import styleFunctionSx from '@mui/system/styleFunctionSx';
import experimental_extendTheme, {
  SupportedColorScheme,
  CssVarsTheme,
} from './experimental_extendTheme';
import createTypography from './createTypography';
import excludeVariablesFromRoot from './excludeVariablesFromRoot';
import THEME_ID from './identifier';
import { defaultConfig } from '../InitColorSchemeScript/InitColorSchemeScript';

const defaultTheme = experimental_extendTheme();

const {
  CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript: deprecatedGetInitColorSchemeScript,
} = createCssVarsProvider<SupportedColorScheme, typeof THEME_ID>({
  themeId: THEME_ID,
  theme: defaultTheme,
  attribute: defaultConfig.attribute,
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
  excludeVariablesFromRoot,
});

let warnedInitScriptOnce = false;

// TODO: remove in v7
const getInitColorSchemeScript: typeof deprecatedGetInitColorSchemeScript = (params) => {
  if (!warnedInitScriptOnce) {
    console.warn(
      [
        'MUI: The getInitColorSchemeScript function has been deprecated.',
        '',
        "You should use `import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'`",
        'and replace the function call with `<InitColorSchemeScript />` instead.',
      ].join('\n'),
    );

    warnedInitScriptOnce = true;
  }
  return deprecatedGetInitColorSchemeScript(params);
};

export {
  useColorScheme,
  getInitColorSchemeScript,
  CssVarsProvider as Experimental_CssVarsProvider,
};
