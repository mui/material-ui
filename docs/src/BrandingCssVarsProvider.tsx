import * as React from 'react';
import { deepmerge, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  PaletteColorOptions,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextNProgressBar } from 'docs/src/modules/components/AppFrame';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    primaryDark?: PaletteColorOptions;
  }
}

const { palette: lightPalette, typography, ...designTokens } = getDesignTokens('light');
const { palette: darkPalette } = getDesignTokens('dark');

const theme = extendTheme({
  cssVarPrefix: 'muidocs',
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
      '[data-mui-color-scheme="dark"] &': {
        color: 'initial',
      },
    },
    h2: {
      '[data-mui-color-scheme="dark"] &': {
        color: 'var(--muidocs-palette-grey-100)',
      },
    },
    h5: {
      '[data-mui-color-scheme="dark"] &': {
        color: 'var(--muidocs-palette-primary-300)',
      },
    },
  }),
  ...getThemedComponents(),
});

const ColorSchemeAdjustment = () => {
  useEnhancedEffect(() => {
    return () => {
      // Due to the change in https://github.com/mui/material-ui/pull/29946, the color-scheme is reset to the previous value when CssVarsProvider unmounts.
      // I'm still not sure if it is the expected behavior or our docs is an edge case.

      // make sure that the color-scheme does not change after the component unmounted.
      const mode = localStorage.getItem('mui-mode');
      document.documentElement.style.setProperty('color-scheme', mode);
    };
  }, []);
  return null;
};

export default function BrandingCssVarsProvider({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={theme} disableTransitionOnChange>
      <NextNProgressBar />
      <CssBaseline />
      {children}
      <ColorSchemeAdjustment />
    </CssVarsProvider>
  );
}
