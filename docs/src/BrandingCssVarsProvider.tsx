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
          display1: 'var(--muidocs-palette-primaryDark-900)',
          display2: 'var(--muidocs-palette-primaryDark-700)',
          h5: 'var(--muidocs-palette-primary-main)',
          action: 'var(--muidocs-palette-primary-600)',
          actionHover: 'var(--muidocs-palette-primary-700)',
        },
        Switch: {
          trackBg: 'var(--muidocs-palette-grey-400)',
        },
        Chip: {
          defaultFilledColor: 'var(--muidocs-palette-primary-700)',
        },
      }),
    },
    dark: {
      palette: deepmerge(darkPalette, {
        text: {
          display1: '#fff',
          display2: 'var(--muidocs-palette-grey-100)',
          h5: 'var(--muidocs-palette-primary-300)',
          action: 'var(--muidocs-palette-primary-300)',
          actionHover: 'var(--muidocs-palette-primary-200)',
        },
        Switch: {
          trackBg: 'var(--muidocs-palette-grey-800)',
        },
        Chip: {},
      }),
    },
  },
  ...designTokens,
  typography: deepmerge(typography, {
    h1: {
      color: 'var(--muidocs-palette-text-display1)',
    },
    h2: {
      color: 'var(--muidocs-palette-text-display2)',
    },
    h5: {
      color: 'var(--muidocs-palette-text-h5)',
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
