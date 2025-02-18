import * as React from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

export default function CircularProgressSizes() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <CircularProgress size="sm" />
      <CircularProgress size="md" />
      <CircularProgress size="lg" />
    </Box>
  );
}
