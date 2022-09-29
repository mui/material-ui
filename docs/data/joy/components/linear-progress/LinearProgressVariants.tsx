import * as React from 'react';
import Box from '@mui/joy/Box';
import LinearProgress from '@mui/joy/LinearProgress';

export default function LinearProgressVariants() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexDirection: 'column' }}>
      <LinearProgress variant="solid" />
      <LinearProgress variant="soft" />
      <LinearProgress variant="outlined" />
      <LinearProgress variant="plain" />
    </Box>
  );
}
