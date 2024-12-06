import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const theme = createTheme({
  experimentalColorMix: 'srgb',
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: 'oklch(81% 0.50 78)',
          light: 'oklch(70% 0.50 78)',
          dark: 'oklch(49% 0.50 78)',
          contrastText: '#fff',
        },
        info: {
          main: 'oklch(81% 0.50 78)',
          light: 'oklch(70% 0.50 78)',
          dark: 'oklch(49% 0.50 78)',
          contrastText: '#fff',
        },
      },
    },
  },
});

export default function ColorMix() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 2,
          p: 2,
        }}
      >
        <Stack spacing={2}>
          <Button variant="outlined">Text</Button>
          <Button variant="contained">Text</Button>
          <Button variant="text">Text</Button>
        </Stack>

        <Stack spacing={2}>
          <Alert severity="info" variant="filled">
            This is an info alert — check it out!
          </Alert>
          <Alert severity="success">This is a success alert — check it out!</Alert>
          <Alert severity="warning">This is a warning alert — check it out!</Alert>
          <Alert severity="error">This is an error alert — check it out!</Alert>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
