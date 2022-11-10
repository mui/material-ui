import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ColorTextFields() {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
        label="Outlined secondary"
        color="secondary"
        focused
        value={value}
        onChange={handleChange}
      />
      <TextField
        label="Filled success"
        variant="filled"
        color="success"
        focused
        value={value}
        onChange={handleChange}
      />
      <TextField
        label="Standard warning"
        variant="standard"
        color="warning"
        focused
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
