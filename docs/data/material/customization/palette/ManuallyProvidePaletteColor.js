import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box, Stack } from '@mui/system';
import { unstable_capitalize as capitalize } from '@mui/utils';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5733',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
  },
});

function ColorShowcase({ color }) {
  return (
    <Stack gap={1} alignItems="center">
      <Button variant="contained" color={color}>
        {capitalize(color)}
      </Button>
      <Stack direction="row" gap={1}>
        <Box sx={{ bgcolor: `${color}.light`, width: 20, height: 20 }} />
        <Box sx={{ bgcolor: `${color}.main`, width: 20, height: 20 }} />
        <Box sx={{ bgcolor: `${color}.dark`, width: 20, height: 20 }} />
      </Stack>
    </Stack>
  );
}

export default function Palette() {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" gap={4}>
        <ColorShowcase color="primary" />
        <ColorShowcase color="secondary" />
      </Stack>
    </ThemeProvider>
  );
}
