import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { darken, lighten, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SearchAppBar from 'docs/src/modules/branding/SearchAppBar';
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
      [theme.breakpoints.up('md')]: {
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
      [theme.breakpoints.up('md')]: {
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
      [theme.breakpoints.up('md')]: {
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
    button: {
      fontWeight: 700,
      fontSize: 16,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'initial',
          '&.Mui-focusVisible': {
            ':after': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: '2px',
              border: `2px solid ${theme.palette.vividBlue}`, // vivid blue outline when focused
            },
          },
          '&:active': {
            backgroundColor: darken(theme.palette.grey.A100, 0.2),
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            '&:hover': {
              backgroundColor: lighten(theme.palette.primary.main, 0.2),
            },
            '&:active': {
              backgroundColor: darken(theme.palette.primary.main, 0.2),
            },
          },
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            '&:hover': {
              backgroundColor: lighten(theme.palette.secondary.main, 0.2),
            },
            '&:active': {
              backgroundColor: darken(theme.palette.secondary.main, 0.2),
            },
          },
        },
      ],
    },
  },
});

interface PageProps {
  children?: React.ReactNode;
}

export default function Page(props: PageProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12}>
          <SearchAppBar />
        </Grid>
        <Grid item xs={12}>
          <Box component={Container} disableGutters maxWidth={false} sx={{ overflow: 'hidden' }}>
            {props.children}
          </Box>
        </Grid>
      </Grid>
      <BrandingFooter />
    </ThemeProvider>
  );
}
