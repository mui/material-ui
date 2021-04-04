import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export default function HelperTextMisaligned() {
  return (
    <Box
      sx={{
        '& > :not(style)': {
          m: 1,
        },
      }}
    >
      <TextField
        helperText="Please enter your name"
        id="demo-helper-text-misaligned"
        label="Name"
        variant="standard"
      />
      <TextField
        id="demo-helper-text-misaligned-no-helper"
        label="Name"
        variant="standard"
      />
    </Box>
  );
}
