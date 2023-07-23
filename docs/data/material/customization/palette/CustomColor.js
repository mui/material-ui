import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    neutral: {
      light: '#838fa2',
      main: '#64748b',
      dark: '#465161',
      contrastText: '#fff',
    },
  },
});

export default function CustomColor() {
  return (
    <ThemeProvider theme={theme}>
      <Button color="neutral" variant="contained">
        neutral
      </Button>
    </ThemeProvider>
  );
}
