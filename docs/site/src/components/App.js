import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppRouter from './AppRouter';

export default function App() {
  return (
    <MuiThemeProvider>
      <AppRouter />
    </MuiThemeProvider>
  );
}
