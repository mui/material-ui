import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export default function LayoutTextFields() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': { mb: 2 },
        '& .MuiTextField-root': { m: 1 },
        '& .MuiTextField-root:not(:first-of-type)': { width: '25ch' },
      }}
    >
      <div>
        <TextField
          id="outlined-full-width"
          label="Label"
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="None"
          id="outlined-margin-none"
          defaultValue="Default Value"
          helperText="Some important text"
        />
        <TextField
          label="Dense"
          id="outlined-margin-dense"
          defaultValue="Default Value"
          helperText="Some important text"
          margin="dense"
        />
        <TextField
          label="Normal"
          id="outlined-margin-normal"
          defaultValue="Default Value"
          helperText="Some important text"
          margin="normal"
        />
      </div>
      <div>
        <TextField
          id="filled-full-width"
          label="Label"
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <TextField
          label="None"
          id="filled-margin-none"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="filled"
        />
        <TextField
          label="Dense"
          id="filled-margin-dense"
          defaultValue="Default Value"
          helperText="Some important text"
          margin="dense"
          variant="filled"
        />
        <TextField
          label="Normal"
          id="filled-margin-normal"
          defaultValue="Default Value"
          helperText="Some important text"
          margin="normal"
          variant="filled"
        />
      </div>
      <div>
        <TextField
          id="standard-full-width"
          label="Label"
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <TextField
          label="None"
          id="margin-none"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="standard"
        />
        <TextField
          label="Dense"
          id="margin-dense"
          defaultValue="Default Value"
          helperText="Some important text"
          margin="dense"
          variant="standard"
        />
        <TextField
          label="Normal"
          id="margin-normal"
          defaultValue="Default Value"
          helperText="Some important text"
          margin="normal"
          variant="standard"
        />
      </div>
    </Box>
  );
}
