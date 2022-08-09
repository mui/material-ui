import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';

export default function AlertVariants() {
  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
      <Alert variant="solid">Solid</Alert>
      <Alert variant="soft">Soft</Alert>
      <Alert variant="outlined">Outlined</Alert>
      <Alert variant="plain">Plain</Alert>
    </Box>
  );
}
