import * as React from 'react';
import {
  alpha,
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  PaletteColorOptions,
  Theme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextNProgressBar } from 'docs/src/modules/components/AppFrame';
import {
  blue,
  blueDark,
  grey,
  error,
  success,
  warning,
  getThemedComponents,
} from 'docs/src/modules/brandingTheme';

const systemFont = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

declare module '@mui/material/styles' {
  interface TypeText {
    display1: string;
    display2: string;
    h5: string;
  }

  interface PaletteOptions {
    primaryDark: PaletteColorOptions;
  }
}

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: blue,
        primaryDark: blueDark,
        common: {
          black: '#1D1D1D',
        },
        divider: grey[100],
        text: {
          primary: grey[900],
          secondary: grey[700],
          display2: 'var(--mui-palette-primaryDark-700)',
          h5: 'var(--mui-palette-primary-main)',
        },
        grey,
        error,
        success: {
          ...success,
          main: '#1AA251', // contrast 3.31:1
        },
        warning,
      },
    },
    dark: {
      palette: {
        primary: {
          ...blue,
          main: blue[400],
        },
        primaryDark: blueDark,
        background: {
          default: blueDark[800],
          paper: blueDark[900],
        },
        common: {
          black: '#1D1D1D',
        },
        divider: alpha(blue[100], 0.08),
        text: {
          primary: '#fff',
          secondary: grey[400],
          display1: 'var(--mui-palette-primaryDark-900)',
          display2: 'var(--mui-palette-grey-100)',
          h5: 'var(--mui-palette-primary-300)',
        },
        grey,
        error,
        success: {
          ...success,
          main: '#1DB45A', // contrast 6.17:1 (blueDark.800)
        },
        warning,
      },
    },
  },
  shape: {
    borderRadius: 10,
  },
  spacing: 10,
  typography: {
    fontFamily: ['"IBM Plex Sans"', ...systemFont].join(','),
    fontFamilyCode: ['Consolas', 'Menlo', 'Monaco', 'Andale Mono', 'Ubuntu Mono', 'monospace'].join(
      ',',
    ),
    fontFamilySystem: systemFont.join(','),
    fontWeightSemiBold: 600,
    fontWeightExtraBold: 800,
    h1: {
      fontFamily: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
      fontSize: 'clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)',
      fontWeight: 800,
      lineHeight: 78 / 70,
      color: 'var(--mui-palette-text-display1)',
    },
    h2: {
      fontFamily: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
      fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
      fontWeight: 800,
      lineHeight: 44 / 36,
      color: 'var(--mui-palette-text-display2)',
    },
    h3: {
      fontFamily: ['"PlusJakartaSans-Bold"', ...systemFont].join(','),
      fontSize: '2.25rem', // 36px
      lineHeight: 44 / 36,
      letterSpacing: 0.2,
    },
    h4: {
      fontFamily: ['"PlusJakartaSans-Bold"', ...systemFont].join(','),
      fontSize: '1.75rem', // 28px
      lineHeight: 42 / 28,
      letterSpacing: 0.2,
    },
    h5: {
      fontFamily: ['"PlusJakartaSans-Bold"', ...systemFont].join(','),
      fontSize: '1.5rem', // 24px
      lineHeight: 36 / 24,
      letterSpacing: 0.1,
      color: 'var(--mui-palette-text-h5)',
    },
    h6: {
      fontSize: '1.25rem', // 20px
      lineHeight: 30 / 20,
    },
    button: {
      textTransform: 'initial',
      fontWeight: 700,
      letterSpacing: 0,
    },
    subtitle1: {
      fontSize: '1.125rem', // 18px
      lineHeight: 24 / 18,
      letterSpacing: 0,
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem', // 16px
      lineHeight: 24 / 16,
      letterSpacing: 0,
    },
    body2: {
      fontSize: '0.875rem', // 14px
      lineHeight: 21 / 14,
      letterSpacing: 0,
    },
    caption: {
      display: 'inline-block',
      fontSize: '0.75rem', // 12px
      lineHeight: 18 / 12,
      letterSpacing: 0,
      fontWeight: 700,
    },
    allVariants: {
      scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
    },
  },
});

const resolveTheme = (parsedTheme: Theme) => {
  return {
    ...parsedTheme,
    ...getThemedComponents(parsedTheme),
  };
};

export default function BrandingCssVarsProvider({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={theme} resolveTheme={resolveTheme}>
      <CssBaseline />
      <NextNProgressBar />
      {children}
    </CssVarsProvider>
  );
}
