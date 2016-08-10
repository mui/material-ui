// @flow weak

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Router from './Router';

export default function App(props) {
  return (
    <MuiThemeProvider {...props}>
      <Router />
    </MuiThemeProvider>
  );
}
