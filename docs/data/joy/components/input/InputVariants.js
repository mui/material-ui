import * as React from 'react';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';

export default function InputVariants() {
  return (
    <Box
      sx={{ py: 2, display: 'grid', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Input placeholder="Type in here…" variant="solid" />
      <Input placeholder="Type in here…" variant="soft" />
      <Input placeholder="Type in here…" variant="outlined" />
      <Input placeholder="Type in here…" variant="plain" />
    </Box>
  );
}
