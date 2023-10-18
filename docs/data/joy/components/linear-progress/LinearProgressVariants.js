import * as React from 'react';
import Stack from '@mui/joy/Stack';
import LinearProgress from '@mui/joy/LinearProgress';

export default function LinearProgressVariants() {
  return (
    <Stack spacing={2} sx={{ flex: 1 }}>
      <LinearProgress variant="solid" />
      <LinearProgress variant="soft" />
      <LinearProgress variant="outlined" />
      <LinearProgress variant="plain" />
    </Stack>
  );
}
