import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppHeader from 'docs/src/layouts/AppHeader';
import Hero from 'docs/src/components/home/Hero';

const brandingTheme = createTheme({
  palette: {
    primary: {
      main: '#007FFF',
    },
    text: {
      primary: '#0a1929',
      secondary: '#5a6978',
    },
  },
  shape: {
    borderRadius: 10,
  },
  spacing: 10,
  typography: {
    fontFamily: "'PlusJakartaSans', sans-serif",
    button: {
      textTransform: 'initial',
      fontWeight: 'bold',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variant: 'body2',
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        sizeLarge: {
          padding: '13px 20px',
        },
      },
    },
  },
});

const Home = () => {
  return (
    <ThemeProvider theme={brandingTheme}>
      <CssBaseline />
      <AppHeader />
      <Hero />
    </ThemeProvider>
  );
};

export default Home;
