import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { darken, createMuiTheme, alpha, ThemeProvider } from '@material-ui/core/styles';
// import SearchAppBar from 'docs/src/modules/branding/SearchAppBar';
import BrandingFooter from 'docs/src/modules/branding/BrandingFooter';

interface CustomPalette {
  azure: string;
  vividBlue: string;
  emeral: string;
  sizzlingRed: string;
  sunglow: string;
  grey5A: string;
  grey87: string;
  greyAA: string;
  greyD7: string;
  greyE5: string;
  greyEA: string;
  greyF3: string;
}

interface CustomPaletteOptions {
  azure?: string;
  vividBlue?: string;
  emeral?: string;
  sizzlingRed?: string;
  sunglow?: string;
  grey5A?: string;
  grey87?: string;
  greyAA?: string;
  greyD7?: string;
  greyE5?: string;
  greyEA?: string;
  greyF3?: string;
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPaletteOptions {}
}

// Update the Typography's variant prop options
declare module '@material-ui/core/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}

function round(value: number) {
  return Math.round(value * 1e5) / 1e5;
}

const oxfordBlue = '#001E3C';

let theme = createMuiTheme({
  palette: {
    text: {
      primary: oxfordBlue,
    },
    primary: {
      main: '#007FFF',
    },
    secondary: {
      main: oxfordBlue,
    },
    background: {
      default: '#FFF',
    },
    vividBlue: '#00C8FF',
    emeral: '#21CC66',
    sizzlingRed: '#FF505F',
    sunglow: '#FFC846',
    grey5A: '#5A6978',
    grey87: '#8796A5',
    greyAA: '#AAB4BE',
    greyD7: '#D7DCE1',
    greyE5: '#E5E8EC',
    greyEA: '#EAEEF3',
    greyF3: '#F3F6F9',
  },
  typography: {
    fontWeightMedium: undefined,
    fontFamily: [
      'Inter',
      // system-font
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
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 0, // phones
      sm: 600, // tablets
      md: 900, // small laptops
      lg: 1200, // desktops
      xl: 1500, // large screens
    },
  },
});

theme = createMuiTheme(theme, {
  palette: {
    action: {
      active: theme.palette.grey87,
    },
    text: {
      secondary: theme.palette.grey5A,
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
      letterSpacing: `${round(-2 / 72)}em`,
      lineHeight: 1.111,
      fontSize: 44,
      [theme.breakpoints.up('sm')]: {
        fontSize: 68,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 72,
      },
    },
    h2: {
      fontWeight: 700,
      letterSpacing: `${round(-1.5 / 52)}em`,
      lineHeight: 1.154,
      fontSize: 40,
      [theme.breakpoints.up('sm')]: {
        fontSize: 48,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 52,
      },
    },
    h3: {
      fontWeight: 700,
      letterSpacing: `${round(-1 / 36)}em`,
      lineHeight: 1.222,
      fontSize: 28,
      [theme.breakpoints.up('sm')]: {
        fontSize: 32,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: 36,
      },
    },
    h4: {
      fontWeight: 700,
      letterSpacing: `${round(-0.5 / 24)}em`,
      lineHeight: 1.25,
      fontSize: 24,
    },
    h5: undefined,
    h6: undefined,
    subtitle1: undefined,
    subtitle2: undefined,
    button: {
      fontWeight: 700,
      fontSize: 16,
    },
    body1: {
      fontSize: 16,
      [theme.breakpoints.up('sm')]: {
        fontSize: 18,
      },
    },
    body2: {
      fontSize: 14,
      [theme.breakpoints.up('sm')]: {
        fontSize: 16,
      },
    },
    body3: {
      fontSize: 14,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 16,
          [theme.breakpoints.up('sm')]: {
            fontSize: 16,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'initial',
        },
        colorInherit: {
          backgroundColor: theme.palette.greyD7,
          '&.Mui-focusVisible': {
            boxShadow: `0 0 0 0.25rem ${alpha(theme.palette.greyD7, 0.5)}`,
          },
          '&:hover': {
            backgroundColor: darken(theme.palette.greyD7, 0.1),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: theme.palette.greyD7,
            },
          },
          '&:active': {
            backgroundColor: darken(theme.palette.greyD7, 0.2),
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            '&.Mui-focusVisible': {
              boxShadow: `0 0 0 0.25rem ${alpha(theme.palette.primary.main, 0.5)}`,
            },
            '&:hover': {
              backgroundColor: darken(theme.palette.primary.main, 0.15),
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                backgroundColor: theme.palette.primary.main,
              },
            },
            '&:active': {
              backgroundColor: darken(theme.palette.primary.main, 0.3),
            },
          },
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            '&:hover': {
              backgroundColor: darken(theme.palette.secondary.main, 0.15),
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                backgroundColor: theme.palette.secondary.main,
              },
            },
            '&:active': {
              backgroundColor: darken(theme.palette.secondary.main, 0.3),
            },
          },
        },
        {
          props: { size: 'small' },
          style: {
            padding: '8px 16px',
            fontSize: 14,
          },
        },
        {
          props: { size: 'large' },
          style: {
            padding: '14px 22px',
            boxShadow: '0 2px 3px rgba(0, 30, 60, 0.08)',
            fontSize: 18,
          },
        },
      ],
    },
    MuiCssBaseline: {
      styleOverrides: {
        ul: {
          listStyle: 'none',
        },
      },
    },
  },
});

interface BrandingRootProps {
  children?: React.ReactNode;
}

export default function BrandingRoot(props: BrandingRootProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <SearchAppBar /> */}
      {props.children}
      <BrandingFooter />
    </ThemeProvider>
  );
}
