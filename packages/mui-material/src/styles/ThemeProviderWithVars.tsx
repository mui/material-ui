'use client';
import * as React from 'react';
import styleFunctionSx from '@mui/system/styleFunctionSx';
import { unstable_createCssVarsProvider as createCssVarsProvider, SxProps } from '@mui/system';
import { SupportedColorScheme, CssVarsTheme } from './createThemeWithVars';
import createTheme from './createTheme';
import createTypography from './createTypography';
import THEME_ID from './identifier';
import { defaultConfig } from '../InitColorSchemeScript/InitColorSchemeScript';

const {
  CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript: deprecatedGetInitColorSchemeScript,
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

let warnedOnce = false;

// TODO: remove in v7
// eslint-disable-next-line @typescript-eslint/naming-convention
function Experimental_CssVarsProvider(props: any) {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The Experimental_CssVarsProvider component has been stabilized.',
        '',
        "You should use `import { CssVarsProvider } from '@mui/material/styles'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <CssVarsProvider {...props} />;
}

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

export { useColorScheme, CssVarsProvider, getInitColorSchemeScript, Experimental_CssVarsProvider };
