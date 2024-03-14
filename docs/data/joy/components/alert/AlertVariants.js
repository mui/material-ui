import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';

export default function AlertVariants() {
  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
      <Alert variant="solid">This is an Alert using the solid variant.</Alert>
      <Alert variant="soft">This is an Alert using the soft variant.</Alert>
      <Alert variant="outlined">This is an Alert using the outlined variant.</Alert>
      <Alert variant="plain">This is an Alert using the plain variant.</Alert>
    </Box>
  );
}
