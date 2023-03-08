import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';

export default function AlertSizes() {
  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
      <Alert size="sm">This is a small Alert.</Alert>
      <Alert size="md">This is a medium Alert.</Alert>
      <Alert size="lg">This is a large Alert.</Alert>
    </Box>
  );
}
