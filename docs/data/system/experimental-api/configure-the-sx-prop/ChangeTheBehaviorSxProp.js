import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Retain type safety.

const theme = createTheme({
  unstable_sxConfig: {
    // You can now use the borderRadius key in sx
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
    <Stack direction="row" sx={{ gap: 1 }}>
      <ThemeProvider theme={theme}>
        <Box sx={{ borderRadius: 'sm', border: 1, p: 4 }} />
        <Box sx={{ borderRadius: 'md', border: 1, p: 4 }} />
        <Box sx={{ borderRadius: 'lg', border: 1, p: 4 }} />
      </ThemeProvider>
    </Stack>
  );
}
