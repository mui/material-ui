import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export default function StateTextFields() {
  const [name, setName] = React.useState('Cat in the Hat');
  const handleChange = (event) => {
    setName(event.target.value);
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
          id="outlined-name"
          label="Name"
          value={name}
          onChange={handleChange}
        />
        <TextField
          id="outlined-uncontrolled"
          label="Uncontrolled"
          defaultValue="foo"
        />
      </div>
      <div>
        <TextField
          id="filled-name"
          label="Name"
          value={name}
          onChange={handleChange}
          variant="filled"
        />
        <TextField
          id="filled-uncontrolled"
          label="Uncontrolled"
          defaultValue="foo"
          variant="filled"
        />
      </div>
      <div>
        <TextField
          id="standard-name"
          label="Name"
          value={name}
          onChange={handleChange}
          variant="standard"
        />
        <TextField
          id="standard-uncontrolled"
          label="Uncontrolled"
          defaultValue="foo"
          variant="standard"
        />
      </div>
    </Box>
  );
}
