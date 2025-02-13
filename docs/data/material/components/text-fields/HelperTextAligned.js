import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function HelperTextAligned() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
      <TextField
        helperText="Please enter your name"
        id="demo-helper-text-aligned"
        label="Name"
      />
      <TextField
        helperText=" "
        id="demo-helper-text-aligned-no-helper"
        label="Name"
      />
    </Box>
  );
}
