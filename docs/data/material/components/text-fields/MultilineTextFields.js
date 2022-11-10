import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields() {
  const [values, setValue] = React.useState({
    max: 'Controlled',
    auto: '',
    row: '',
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
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          value={values.max}
          onChange={handleChange('max')}
        />
        <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          value={values.auto}
          onChange={handleChange('auto')}
        />
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          value={values.row}
          onChange={handleChange('row')}
        />
      </div>
      <div>
        <TextField
          id="filled-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          value={values.max}
          onChange={handleChange('max')}
          variant="filled"
        />
        <TextField
          id="filled-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="filled"
          value={values.auto}
          onChange={handleChange('auto')}
        />
        <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          value={values.row}
          onChange={handleChange('row')}
          variant="filled"
        />
      </div>
      <div>
        <TextField
          id="standard-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          value={values.max}
          onChange={handleChange('max')}
          variant="standard"
        />
        <TextField
          id="standard-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="standard"
          value={values.auto}
          onChange={handleChange('auto')}
        />
        <TextField
          id="standard-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          value={values.row}
          onChange={handleChange('row')}
          variant="standard"
        />
      </div>
    </Box>
  );
}
