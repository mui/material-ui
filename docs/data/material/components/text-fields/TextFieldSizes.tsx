import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextFieldSizes() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="Size"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
        />
        <TextField label="Size" id="outlined-size-normal" defaultValue="Normal" />
      </div>
      <div>
        <TextField
          label="Size"
          id="filled-size-small"
          defaultValue="Small"
          variant="filled"
          size="small"
        />
        <TextField
          label="Size"
          id="filled-size-normal"
          defaultValue="Normal"
          variant="filled"
        />
      </div>
      <div>
        <TextField
          label="Size"
          id="standard-size-small"
          defaultValue="Small"
          size="small"
          variant="standard"
        />
        <TextField
          label="Size"
          id="standard-size-normal"
          defaultValue="Normal"
          variant="standard"
        />
      </div>
    </Box>
  );
}
