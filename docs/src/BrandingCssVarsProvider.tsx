import * as React from 'react';
import { deepmerge } from '@mui/utils';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  // @ts-ignore need to use deprecated API because MUI X repo still on Material UI v5
  experimental_extendTheme as extendTheme,
  // @ts-ignore to bypass type checking in MUI X repo because it still on Material UI v5
  createColorScheme,
  ThemeProvider,
  createTheme,
  PaletteColorOptions,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// @ts-ignore to bypass type checking in MUI X repo
import { NextNProgressBar } from 'docs/src/modules/components/AppFrame';
import { getDesignTokens, getThemedComponents } from '@mui/docs/branding';
import SkipLink from 'docs/src/modules/components/SkipLink';
// @ts-ignore to bypass type checking in MUI X repo
import MarkdownLinks from 'docs/src/modules/components/MarkdownLinks';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    primaryDark?: PaletteColorOptions;
  }
}

const { palette: lightPalette, typography, ...designTokens } = getDesignTokens('light');
const { palette: darkPalette } = getDesignTokens('dark');
const themeOptions = {
  colorSchemes: {
    light: {
      palette: lightPalette,
    },
    dark: {
      palette: darkPalette,
    },
  },
  ...designTokens,
  typography: deepmerge(typography, {
    h1: {
      ':where([data-mui-color-scheme="dark"]) &': {
        color: 'var(--muidocs-palette-common-white)',
      },
    },
    h2: {
      ':where([data-mui-color-scheme="dark"]) &': {
        color: 'var(--muidocs-palette-grey-100)',
      },
    },
    h5: {
      ':where([data-mui-color-scheme="dark"]) &': {
        color: 'var(--muidocs-palette-primary-300)',
      },
    },
  }),
  ...getThemedComponents(),
};

// `createColorScheme` is available in Material UI v6+
// TODO: use the `createTheme` once the MUI X repo upgrade to Material UI v6+
const theme =
  typeof createColorScheme === 'function'
    ? createTheme({
        // @ts-ignore to bypass type checking in MUI X repo
        cssVariables: {
          cssVarPrefix: 'muidocs',
          colorSchemeSelector: 'data-mui-color-scheme',
        },
        ...themeOptions,
      })
    : extendTheme({
        cssVarPrefix: 'muidocs',
        // @ts-ignore to bypass type checking in MUI X repo
        colorSchemeSelector: 'data-mui-color-scheme',
        ...themeOptions,
      });

// TODO: use the `ThemeProvider` once the MUI X repo upgrade to Material UI v6+
const ThemeVarsProvider = typeof createColorScheme === 'function' ? ThemeProvider : CssVarsProvider;

export default function BrandingCssVarsProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    // need to use deprecated API because MUI X repo still on Material UI v5
    <ThemeVarsProvider theme={theme} disableTransitionOnChange forceThemeRerender>
      <NextNProgressBar />
      <CssBaseline />
      <SkipLink />
      <MarkdownLinks />
      {children}
    </ThemeVarsProvider>
  );
}
