import * as React from 'react';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';

export default function InputColors() {
  return (
    <Box
      sx={{ py: 2, display: 'grid', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Input placeholder="Type in here…" variant="outlined" color="primary" />
      <Input placeholder="Type in here…" variant="outlined" color="neutral" />
      <Input placeholder="Type in here…" variant="outlined" color="danger" />
      <Input placeholder="Type in here…" variant="outlined" color="success" />
      <Input placeholder="Type in here…" variant="outlined" color="warning" />
    </Box>
  );
}
