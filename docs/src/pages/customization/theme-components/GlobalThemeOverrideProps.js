import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const defaultTheme = createTheme();

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: (props) => ({
          border: 'none',
          ...(props?.color === 'primary' && {
            border: `1px solid ${defaultTheme.palette.primary.dark}`,
          }),
        }),
      },
    },
  },
});

export default function GlobalThemeOverride() {
  return (
    <ThemeProvider theme={theme}>
      <Button color="primary">primary</Button>
      <Button color="secondary">primary</Button>
    </ThemeProvider>
  );
}
