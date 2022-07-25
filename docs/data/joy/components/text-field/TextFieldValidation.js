import * as React from 'react';
import Box from '@mui/joy/Box';
import TextField from '@mui/joy/TextField';

export default function TextFieldValidator() {
  return (
    <Box sx={{ p: 4 }}>
      <TextField
        label="Label"
        placeholder="Type in here..."
        error
        helperText="You got this wrong. Try again!"
      />
    </Box>
  );
}
