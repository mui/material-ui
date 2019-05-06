import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import WithTheme from '../themes/WithTheme';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});

function DarkTheme() {
  return (
    <ThemeProvider theme={theme}>
      <WithTheme />
    </ThemeProvider>
  );
}

export default DarkTheme;
