import * as React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { green, orange } from '@material-ui/core/colors';

const outerTheme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

const innerTheme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

export default function ThemeNesting() {
  return (
    <ThemeProvider theme={outerTheme}>
      <Checkbox defaultChecked />
      <ThemeProvider theme={innerTheme}>
        <Checkbox defaultChecked />
      </ThemeProvider>
    </ThemeProvider>
  );
}
