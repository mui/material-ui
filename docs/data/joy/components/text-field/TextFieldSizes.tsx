import * as React from 'react';
import Box from '@mui/joy/Box';
import TextField from '@mui/joy/TextField';

export default function TextFieldSizes() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <TextField size="sm" label="Size" placeholder="Small" />
      <TextField size="md" label="Size" placeholder="Medium" />
      <TextField size="lg" label="Size" placeholder="Large" />
    </Box>
  );
}
