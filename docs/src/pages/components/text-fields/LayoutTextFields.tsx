import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export default function LayoutTextFields() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& .MuiTextField-root:first-of-type': { m: 1, mb: 2 },
        '& .MuiTextField-root:not(:first-of-type)': { mx: 1, width: '25ch' },
      }}
    >
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
    </Box>
  );
}
