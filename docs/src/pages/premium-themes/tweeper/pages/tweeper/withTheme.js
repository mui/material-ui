import React from 'react';
import { ThemeProvider } from '@material-ui/styles';

const withTheme = theme => Component => props => (
  <ThemeProvider theme={theme}>
    <Component {...props} />
  </ThemeProvider>
);

export default withTheme;
