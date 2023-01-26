import * as React from 'react';
import { createTheme, ThemeProvider, Box, Stack } from '@mui/system';

// Retain type safety.
declare module '@mui/system' {
  interface Shape {
    sm: number;
    md: number;
    lg: number;
  }
}

const theme = createTheme({
  unstable_sxConfig: {
    // You can now use the background key in sx
    // by providing direct values from the palette
    borderRadius: {
      themeKey: 'shape',
    },
  },
  shape: {
    sm: 4,
    md: 8,
    lg: 12,
  },
});

export default function ChangeTheBehaviorSxProp() {
  return (
    <Stack direction="row" gap={1}>
      <ThemeProvider theme={theme}>
        <Box sx={{ borderRadius: 'sm', border: '1px solid black', p: 4 }} />
        <Box sx={{ borderRadius: 'md', border: '1px solid black', p: 4 }} />
        <Box sx={{ borderRadius: 'lg', border: '1px solid black', p: 4 }} />
      </ThemeProvider>
    </Stack>
  );
}
