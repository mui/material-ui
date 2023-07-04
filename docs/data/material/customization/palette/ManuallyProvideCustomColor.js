import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box, Stack } from '@mui/system';

const theme = createTheme({
  palette: {
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});

export default function Palette() {
  return (
    <ThemeProvider theme={theme}>
      <Stack gap={1} alignItems="center">
        <Button variant="contained" color="ochre">
          Ochre
        </Button>
        <Stack direction="row" gap={1}>
          <Box sx={{ bgcolor: `ochre.light`, width: 20, height: 20 }} />
          <Box sx={{ bgcolor: `ochre.main`, width: 20, height: 20 }} />
          <Box sx={{ bgcolor: `ochre.dark`, width: 20, height: 20 }} />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
