import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import BrandingHeader from 'docs/src/modules/branding/BrandingHeader';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007FFF',
    },
  },
  typography: {
    fontFamily: "'PlusJarkatasans', sans-serif",
  },
});

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrandingHeader />
    </ThemeProvider>
  );
};

export default Home;
