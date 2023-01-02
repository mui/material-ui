import * as React from 'react';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';

export default function InputValidation() {
  return (
    <Box sx={{ p: 2 }}>
      <Input placeholder="Type in here…" error defaultValue="Oh no, error found!" />
    </Box>
  );
}
