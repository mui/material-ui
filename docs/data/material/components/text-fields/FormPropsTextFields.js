import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields() {
  const [values, setValues] = React.useState({
    required: 'Hello world',
    disabled: 'Hello World',
    password: '',
    read_only: 'Hello World',
    number: NaN,
    search: '',
    helper_text: 'Default Value',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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
          required
          id="outlined-required"
          label="Required"
          value={values.required}
          onChange={handleChange('required')}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Disabled"
          value={values.disabled}
          onChange={handleChange('disabled')}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange('password')}
        />
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          value={values.read_only}
          onChange={handleChange('read_only')}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={values.number}
          onChange={handleChange('number')}
        />
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          value={values.search}
          onChange={handleChange('search')}
        />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          value={values.helper_text}
          onChange={handleChange('helper_text')}
          helperText="Some important text"
        />
      </div>
      <div>
        <TextField
          required
          id="filled-required"
          label="Required"
          value={values.required}
          onChange={handleChange('required')}
          variant="filled"
        />
        <TextField
          disabled
          id="filled-disabled"
          label="Disabled"
          value={values.disabled}
          onChange={handleChange('disabled')}
          variant="filled"
        />
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          value={values.password}
          onChange={handleChange('password')}
        />
        <TextField
          id="filled-read-only-input"
          label="Read Only"
          value={values.read_only}
          onChange={handleChange('read_only')}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          id="filled-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          value={values.number}
          onChange={handleChange('number')}
        />
        <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={values.search}
          onChange={handleChange('search')}
        />
        <TextField
          id="filled-helperText"
          label="Helper text"
          value={values.helper_text}
          onChange={handleChange('helper_text')}
          helperText="Some important text"
          variant="filled"
        />
      </div>
      <div>
        <TextField
          required
          id="standard-required"
          label="Required"
          value={values.required}
          onChange={handleChange('required')}
          variant="standard"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="Disabled"
          value={values.disabled}
          onChange={handleChange('disabled')}
          variant="standard"
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          value={values.password}
          onChange={handleChange('password')}
        />
        <TextField
          id="standard-read-only-input"
          label="Read Only"
          value={values.read_only}
          onChange={handleChange('read_only')}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={values.number}
          onChange={handleChange('number')}
        />
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
          value={values.search}
          onChange={handleChange('search')}
        />
        <TextField
          id="standard-helperText"
          label="Helper text"
          value={values.helper_text}
          onChange={handleChange('helper_text')}
          helperText="Some important text"
          variant="standard"
        />
      </div>
    </Box>
  );
}
