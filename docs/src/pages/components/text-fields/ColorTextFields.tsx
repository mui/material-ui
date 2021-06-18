import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export default function ColorTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-secondary"
        label="Outlined secondary"
        color="secondary"
        focused
      />
      <TextField
        id="filled-secondary"
        label="Filled secondary"
        variant="filled"
        color="success"
        focused
      />
      <TextField
        id="standard-secondary"
        label="Standard secondary"
        color="warning"
        variant="standard"
        focused
      />
    </Box>
  );
}
