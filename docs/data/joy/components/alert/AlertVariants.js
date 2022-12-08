import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';

export default function AlertVariants() {
  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
      <Alert variant="solid">This is an alert using the solid variant.</Alert>
      <Alert variant="soft">This is an alert using the soft variant.</Alert>
      <Alert variant="outlined">This is an alert using the outlined variant.</Alert>
      <Alert variant="plain">This is an alert using the plain variant.</Alert>
    </Box>
  );
}
