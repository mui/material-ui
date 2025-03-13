import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Augment the palette to include an ochre color

// Update the Button's color options to include an ochre option

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

export default function ManuallyProvideCustomColor() {
  return (
    <ThemeProvider theme={theme}>
      <Stack sx={{ gap: 2, alignItems: 'center' }}>
        <Button variant="contained" color="ochre">
          Ochre
        </Button>
        <Stack direction="row" sx={{ gap: 1 }}>
          <Stack sx={{ alignItems: 'center' }}>
            <Typography variant="body2">light</Typography>
            <Box sx={{ bgcolor: 'ochre.light', width: 40, height: 20 }} />
          </Stack>
          <Stack sx={{ alignItems: 'center' }}>
            <Typography variant="body2">main</Typography>
            <Box sx={{ bgcolor: 'ochre.main', width: 40, height: 20 }} />
          </Stack>
          <Stack sx={{ alignItems: 'center' }}>
            <Typography variant="body2">dark</Typography>
            <Box sx={{ bgcolor: 'ochre.dark', width: 40, height: 20 }} />
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
