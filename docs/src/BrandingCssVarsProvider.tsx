import * as React from 'react';
import { deepmerge } from '@mui/utils';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  PaletteColorOptions,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextNProgressBar } from 'docs/src/modules/components/AppFrame';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';

declare module '@mui/material/styles' {
  interface TypeText {
    display1: string;
    display2: string;
    h5: string;
    action: string;
    actionHover: string;
  }

  interface PaletteOptions {
    primaryDark?: PaletteColorOptions;
  }

  interface PaletteSwitch {
    trackBg: string;
  }

  interface PaletteChip {
    defaultFilledColor: string;
  }
}

const { palette: lightPalette, typography, ...designTokens } = getDesignTokens('light');
const { palette: darkPalette } = getDesignTokens('dark');

const theme = extendTheme({
  cssVarPrefix: 'muidocs',
  colorSchemes: {
    light: {
      palette: deepmerge(lightPalette, {
        text: {
          display1: 'var(--mui-palette-primaryDark-900)',
          display2: 'var(--mui-palette-primaryDark-700)',
          h5: 'var(--mui-palette-primary-main)',
          action: 'var(--mui-palette-primary-600)',
          actionHover: 'var(--mui-palette-primary-700)',
        },
        Switch: {
          trackBg: 'var(--mui-palette-grey-400)',
        },
        Chip: {
          defaultFilledColor: 'var(--mui-palette-primary-700)',
        },
      }),
    },
    dark: {
      palette: deepmerge(darkPalette, {
        text: {
          display1: '#fff',
          display2: 'var(--mui-palette-grey-100)',
          h5: 'var(--mui-palette-primary-300)',
          action: 'var(--mui-palette-primary-300)',
          actionHover: 'var(--mui-palette-primary-200)',
        },
        Switch: {
          trackBg: 'var(--mui-palette-grey-800)',
        },
        Chip: {},
      }),
    },
  },
  ...designTokens,
  typography: deepmerge(typography, {
    h1: {
      color: 'var(--mui-palette-text-display1)',
    },
    h2: {
      color: 'var(--mui-palette-text-display2)',
    },
    h5: {
      color: 'var(--mui-palette-text-h5)',
    },
  }),
  ...getThemedComponents(),
});

export default function BrandingCssVarsProvider({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={theme} disableTransitionOnChange>
      <NextNProgressBar />
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
