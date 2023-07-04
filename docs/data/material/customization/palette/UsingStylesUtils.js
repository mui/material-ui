import * as React from 'react';
import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box, Stack } from '@mui/system';

const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});

export default function Palette() {
  return (
    <ThemeProvider theme={theme}>
      <Stack gap={1} alignItems="center">
        <Button variant="contained" color="violet">
          Violet
        </Button>
        <Stack direction="row" gap={1}>
          <Box sx={{ bgcolor: `violet.light`, width: 20, height: 20 }} />
          <Box sx={{ bgcolor: `violet.main`, width: 20, height: 20 }} />
          <Box sx={{ bgcolor: `violet.dark`, width: 20, height: 20 }} />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
