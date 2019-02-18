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

function ThemeNestingExtend() {
  return (
    <MuiThemeProvider theme={outerTheme}>
      <Checkbox defaultChecked />
      <MuiThemeProvider
        theme={theme =>
          createMuiTheme({
            ...theme,
            palette: {
              ...theme.palette,
              primary: {
                main: green[500],
              },
            },
          })
        }
      >
        <Checkbox defaultChecked color="primary" />
        <Checkbox defaultChecked color="secondary" />
      </MuiThemeProvider>
    </MuiThemeProvider>
  );
}

export default ThemeNestingExtend;
