import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  },
});

export default function Palette() {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" gap={4}>
        <Button variant="contained">Primary</Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
      </Stack>
    </ThemeProvider>
  );
}
