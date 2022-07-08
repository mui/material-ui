import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
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
