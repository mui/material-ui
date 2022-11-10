import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextFieldSizes() {
  const [values, setValue] = React.useState({
    small: 'Small',
    normal: 'Normal',
  });

  const handleChange = (prop) => (event) => {
    setValue({ ...values, [prop]: event.target.value });
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
          label="Size"
          id="outlined-size-small"
          value={values.small}
          onChange={handleChange('small')}
          size="small"
        />
        <TextField
          label="Size"
          id="outlined-size-normal"
          value={values.normal}
          onChange={handleChange('normal')}
        />
      </div>
      <div>
        <TextField
          label="Size"
          id="filled-size-small"
          value={values.small}
          onChange={handleChange('small')}
          variant="filled"
          size="small"
        />
        <TextField
          label="Size"
          id="filled-size-normal"
          value={values.normal}
          onChange={handleChange('normal')}
          variant="filled"
        />
      </div>
      <div>
        <TextField
          label="Size"
          id="standard-size-small"
          value={values.small}
          onChange={handleChange('small')}
          size="small"
          variant="standard"
        />
        <TextField
          label="Size"
          id="standard-size-normal"
          value={values.normal}
          onChange={handleChange('normal')}
          variant="standard"
        />
      </div>
    </Box>
  );
}
