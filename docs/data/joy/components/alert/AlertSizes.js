import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';

export default function AlertSizes() {
  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
      <Alert size="sm">This is an alert in the small size.</Alert>
      <Alert size="md">This is an alert in the medium size.</Alert>
      <Alert size="lg">This is an alert in the large size.</Alert>
    </Box>
  );
}
