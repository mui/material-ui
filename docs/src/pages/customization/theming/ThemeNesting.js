import * as React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import { green, orange } from '@material-ui/core/colors';

const outerTheme = createTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
  },
});

const innerTheme = createTheme({
  palette: {
    secondary: {
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
