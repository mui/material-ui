import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
  },
});

export default function GlobalThemeOverride() {
  return (
    <MuiThemeProvider theme={theme}>
      <Button>font-size: 1rem</Button>
    </MuiThemeProvider>
  );
}
