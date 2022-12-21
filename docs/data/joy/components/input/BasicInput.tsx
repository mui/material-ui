import * as React from 'react';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';

export default function BasicInput() {
  return (
    <Box sx={{ width: '100%' }}>
      <Input placeholder="Type in here…" />
    </Box>
  );
}
