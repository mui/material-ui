import * as React from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { Box, Stack } from '@mui/system';
import { Typography } from '@mui/material';

const defaultTonalOffsetTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

const higherTonalOffsetTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    tonalOffset: 0.5,
  },
});

const asymmetricTonalOffsetTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    tonalOffset: {
      light: 0.1,
      dark: 0.9,
    },
  },
});

function ColorShowcase({ title, color }: { title: string; color: string }) {
  const {
    palette: { tonalOffset },
  } = useTheme();

  let caption;
  if (typeof tonalOffset === 'number') {
    caption = tonalOffset;
  } else {
    caption = `{ light: ${tonalOffset.light}, dark: ${tonalOffset.dark} }`;
  }

  return (
    <Stack gap={1} alignItems="center">
      <span>
        <b>{title}</b>
      </span>
      <span>{caption}</span>
      <Stack direction="row" gap={1}>
        <Stack alignItems="center">
          <Typography variant="body2">light</Typography>
          <Box sx={{ bgcolor: `${color}.light`, width: 40, height: 20 }} />
        </Stack>
        <Stack alignItems="center">
          <Typography variant="body2">main</Typography>
          <Box sx={{ bgcolor: `${color}.main`, width: 40, height: 20 }} />
        </Stack>
        <Stack alignItems="center">
          <Typography variant="body2">dark</Typography>
          <Box sx={{ bgcolor: `${color}.dark`, width: 40, height: 20 }} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default function TonalOffset() {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} gap={8}>
      <ThemeProvider theme={defaultTonalOffsetTheme}>
        <ColorShowcase title="Default tonal offset" color="primary" />
      </ThemeProvider>
      <ThemeProvider theme={higherTonalOffsetTheme}>
        <ColorShowcase title="Higher tonal offset" color="primary" />
      </ThemeProvider>
      <ThemeProvider theme={asymmetricTonalOffsetTheme}>
        <ColorShowcase title="Asymmetric tonal offset" color="primary" />
      </ThemeProvider>
    </Stack>
  );
}
