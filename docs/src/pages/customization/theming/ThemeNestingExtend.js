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

export default function ThemeNestingExtend() {
  return (
    <ThemeProvider theme={outerTheme}>
      <Checkbox defaultChecked color="secondary" />
      <ThemeProvider
        theme={(theme) =>
          createTheme({
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
        <Checkbox defaultChecked />
        <Checkbox defaultChecked color="secondary" />
      </ThemeProvider>
    </ThemeProvider>
  );
}
