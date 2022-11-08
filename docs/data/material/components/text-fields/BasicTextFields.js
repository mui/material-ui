import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

export default function BasicTextFields() {

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
      
      <FormControl variant="standard">
        <TextField
         id="outlined-basic"
         label="Outlined"
         variant="outlined"
         value={value}
         onChange={handleChange} />
      </FormControl>

      <FormControl variant="standard">
        <TextField
         id="filled-basic"
         label="Filled"
         variant="filled"
         value={value}
         onChange={handleChange} />
      </FormControl>

      <FormControl variant="standard">
        <TextField
         id="standard-basic"
         label="Standard"
         variant="standard"
         value={value}
         onChange={handleChange} />
      </FormControl>

    </Box>
  );
}
