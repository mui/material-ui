import * as React from 'react';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';

export default function InputSizes() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </Box>
  );
}
