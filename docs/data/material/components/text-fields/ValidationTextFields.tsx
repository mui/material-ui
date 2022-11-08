import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ValidationTextFields() {

  const [value, setValue] = React.useState('Hello World');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
          error
          id="outlined-error"
          label="Error"
          value={value}
         onChange={handleChange}
        />
        <TextField
          error
          id="outlined-error-helper-text"
          label="Error"
          value={value}
         onChange={handleChange}
          helperText="Incorrect entry."
        />
      </div>
      <div>
        <TextField
          error
          id="filled-error"
          label="Error"
          value={value}
         onChange={handleChange}
          variant="filled"
        />
        <TextField
          error
          id="filled-error-helper-text"
          label="Error"
          value={value}
         onChange={handleChange}
          helperText="Incorrect entry."
          variant="filled"
        />
      </div>
      <div>
        <TextField
          error
          id="standard-error"
          label="Error"
          value={value}
         onChange={handleChange}
          variant="standard"
        />
        <TextField
          error
          id="standard-error-helper-text"
          label="Error"
          value={value}
         onChange={handleChange}
          helperText="Incorrect entry."
          variant="standard"
        />
      </div>
    </Box>
  );
}
