'use client';
import * as React from 'react';
import { unstable_createCssVarsProvider as createCssVarsProvider, SxProps } from '@mui/system';
import styleFunctionSx from '@mui/system/styleFunctionSx';
import extendTheme, { SupportedColorScheme, CssVarsTheme } from './extendTheme';
import createTypography from './createTypography';
import THEME_ID from './identifier';

const defaultTheme = extendTheme();

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } = createCssVarsProvider<
  SupportedColorScheme,
  typeof THEME_ID
>({
  themeId: THEME_ID,
  theme: defaultTheme,
  attribute: 'data-mui-color-scheme',
  modeStorageKey: 'mui-mode',
  colorSchemeStorageKey: 'mui-color-scheme',
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
      return styleFunctionSx({ sx: props, theme: this });
    };

    return newTheme;
  },
});

let warnedOnce = false;

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

export { useColorScheme, getInitColorSchemeScript, CssVarsProvider, Experimental_CssVarsProvider };
