import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  typography: {
    // @ts-ignore
    poster: {
      color: 'red',
    },
    // Disable v3 variant
    h3: undefined,
  },
});

export default function TypographyCustomVariant() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ '& > *': { display: 'block' } }}>
        {/* @ts-ignore */}
        <Typography variant="poster">poster</Typography>
        <Typography variant="h3">h3</Typography>
      </Box>
    </ThemeProvider>
  );
}
