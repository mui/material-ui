import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box, Stack } from '@mui/system';

// Augment the palette to include a salmon color
declare module '@mui/material/styles' {
  interface Palette {
    salmon: Palette['primary'];
  }

  interface PaletteOptions {
    salmon?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include a salmon option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    salmon: true;
  }
}

let theme = createTheme({
  // Theme customization goes here as usual, including tonalOffset and/or
  // contrastThreshold as the augmentColor() function relies on these
});

theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    salmon: theme.palette.augmentColor({
      color: {
        main: '#FF5733',
      },
      name: 'salmon',
    }),
  },
});

export default function Palette() {
  return (
    <ThemeProvider theme={theme}>
      <Stack gap={1} alignItems="center">
        <Button variant="contained" color="salmon">
          Salmon
        </Button>
        <Stack direction="row" gap={1}>
          <Box sx={{ bgcolor: `salmon.light`, width: 20, height: 20 }} />
          <Box sx={{ bgcolor: `salmon.main`, width: 20, height: 20 }} />
          <Box sx={{ bgcolor: `salmon.dark`, width: 20, height: 20 }} />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
