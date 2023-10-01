import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const filledTextFieldStyles = {
  '& .MuiFilledInput-root': {
    backgroundColor: 'inherit',
  },
};

const standardTextFieldStyles = {
  '& .MuiInputBase-root': {
    border: '1px solid #e0e0e0',
  },
};

export default function BasicTextFields() {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" style={filledTextFieldStyles} />
      <TextField id="standard-basic" label="Standard" variant="standard" style={standardTextFieldStyles} />
    </Box>
  );
}
