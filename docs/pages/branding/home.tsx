import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppHeader from 'docs/src/components/AppHeader';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007FFF',
    },
  },
  typography: {
    fontFamily: "'PlusJakartaSans', sans-serif",
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variant: 'body2',
      },
    },
  },
});

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader />
    </ThemeProvider>
  );
};

export default Home;
