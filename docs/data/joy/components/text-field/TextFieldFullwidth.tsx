import * as React from 'react';
import Box from '@mui/joy/Box';
import TextField from '@mui/joy/TextField';

export default function TextFieldFullWidth() {
  return (
    <Box sx={{ width: '100%' }}>
      <TextField label="Label" placeholder="Type in here…" fullWidth />
    </Box>
  );
}
