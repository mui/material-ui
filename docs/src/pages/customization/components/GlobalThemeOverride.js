import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createTheme({
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
    <ThemeProvider theme={theme}>
      <Button>font-size: 1rem</Button>
    </ThemeProvider>
  );
}
