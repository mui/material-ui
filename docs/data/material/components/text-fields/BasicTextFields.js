import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField
        id="filled-basic"
        label="Filled"
        variant="filled"
        sx={{ // Add custom styles for the filled variant
          '& .MuiFilledInput-root': {
            backgroundColor: 'inherit', // Set the background color to inherit
          },
        }}
      />
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        sx={{ // Add custom styles for the standard variant
          '& .MuiInputBase-root': {
            border: '1px solid #e0e0e0', // Set the border for the standard variant
          },
        }}
      />
    </Box>
  );
}

