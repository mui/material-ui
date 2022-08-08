import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Button';

export default function AlertVariants() {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Alert variant="solid">Solid</Alert>
      <Alert variant="soft">Soft</Alert>
      <Alert variant="outlined">Outlined</Alert>
      <Alert variant="plain">Plain</Alert>
    </Box>
  );
}
