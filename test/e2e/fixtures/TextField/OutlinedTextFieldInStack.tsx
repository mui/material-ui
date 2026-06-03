import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function OutlinedTextFieldInStack() {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <TextField id="outlined-in-stack" label="First name" variant="outlined" />
    </Stack>
  );
}
