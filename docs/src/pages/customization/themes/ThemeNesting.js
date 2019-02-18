import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';

const outerTheme = createMuiTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
  },
});

const innerTheme = createMuiTheme({
  palette: {
    secondary: {
      main: green[500],
    },
  },
});

function ThemeNesting() {
  return (
    <MuiThemeProvider theme={outerTheme}>
      <Checkbox defaultChecked />
      <MuiThemeProvider theme={innerTheme}>
        <Checkbox defaultChecked />
      </MuiThemeProvider>
    </MuiThemeProvider>
  );
}

export default ThemeNesting;
