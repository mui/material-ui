import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export default function TextFieldHiddenLabel() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="filled-hidden-label-small">Hidden label</label>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          defaultValue="Small"
          variant="filled"
          size="small"
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="filled-hidden-label-normal">Hidden label</label>
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
        />
      </Box>
    </Box>
  );
}
