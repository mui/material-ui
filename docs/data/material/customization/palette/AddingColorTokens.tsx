import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { Box, Stack } from '@mui/system';

declare module '@mui/material/styles' {
  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      darker: blue[900],
    },
  },
});

export default function AddingColorTokens() {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" gap={1}>
        <Stack gap={1} alignItems="center">
          light
          <Box sx={{ bgcolor: `primary.light`, width: 40, height: 40 }} />
        </Stack>
        <Stack gap={1} alignItems="center">
          main
          <Box sx={{ bgcolor: `primary.main`, width: 40, height: 40 }} />
        </Stack>
        <Stack gap={1} alignItems="center">
          dark
          <Box sx={{ bgcolor: `primary.dark`, width: 40, height: 40 }} />
        </Stack>
        <Stack gap={1} alignItems="center">
          darker
          <Box sx={{ bgcolor: `primary.darker`, width: 40, height: 40 }} />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
