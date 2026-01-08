import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ValidationWarningTextFields() {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          warning
          id="outlined-warning"
          label="Warning"
          defaultValue="Hello World"
        />
        <TextField
          warning
          id="outlined-warning-helper-text"
          label="Warning"
          defaultValue="Hello World"
          helperText="Problematic entry."
        />
      </div>
      <div>
        <TextField
          warning
          id="filled-warning"
          label="Warning"
          defaultValue="Hello World"
          variant="filled"
        />
        <TextField
          warning
          id="filled-warning-helper-text"
          label="Warning"
          defaultValue="Hello World"
          helperText="Problematic entry."
          variant="filled"
        />
      </div>
      <div>
        <TextField
          warning
          id="standard-warning"
          label="Warning"
          defaultValue="Hello World"
          variant="standard"
        />
        <TextField
          warning
          id="standard-warning-helper-text"
          label="Warning"
          defaultValue="Hello World"
          helperText="Problematic entry."
          variant="standard"
        />
      </div>
    </Box>
  );
}
