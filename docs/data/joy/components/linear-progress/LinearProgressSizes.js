import * as React from 'react';
import Stack from '@mui/joy/Stack';
import LinearProgress from '@mui/joy/LinearProgress';

export default function LinearProgressSizes() {
  return (
    <Stack spacing={2} sx={{ flex: 1 }}>
      <LinearProgress size="sm" />
      <LinearProgress size="md" />
      <LinearProgress size="lg" />
    </Stack>
  );
}
