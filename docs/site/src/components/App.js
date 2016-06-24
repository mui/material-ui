import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createMuiTheme, createPalette} from 'material-ui/styles/theme';
import {indigo, pink} from 'material-ui/styles/colors';
import AppRouter from './AppRouter';

const theme = createMuiTheme(createPalette({
  primary: indigo,
  accent: pink,
}));

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  );
}
