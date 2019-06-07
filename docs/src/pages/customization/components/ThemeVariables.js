import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});

export default function ThemeVariables() {
  return (
    <MuiThemeProvider theme={theme}>
      <Button>font-size: 1rem</Button>
    </MuiThemeProvider>
  );
}
