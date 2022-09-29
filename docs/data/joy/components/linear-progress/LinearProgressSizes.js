import * as React from 'react';
import Box from '@mui/joy/Box';
import LinearProgress from '@mui/joy/LinearProgress';

export default function LinearProgressColors() {
  return (
    <Box
      sx={{ display: 'flex', gap: 2, alignItems: 'center', flexDirection: 'column' }}
    >
      <LinearProgress size="sm" />
      <LinearProgress size="md" />
      <LinearProgress size="lg" />
    </Box>
  );
}
