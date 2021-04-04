import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export default function HelperTextAligned() {
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
        id="demo-helper-text-aligned"
        label="Name"
        variant="standard"
      />
      <TextField
        helperText=" "
        id="demo-helper-text-aligned-no-helper"
        label="Name"
        variant="standard"
      />
    </Box>
  );
}
