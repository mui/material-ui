import React from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

export default theme => WrappedComponent => props => (
  <MuiThemeProvider theme={createMuiTheme(theme)}>
    <WrappedComponent {...props} />
  </MuiThemeProvider>
);
