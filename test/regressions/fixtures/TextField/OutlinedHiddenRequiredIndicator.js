import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function OutlinedHiddenRequiredIndicator() {
  return (
    <TextField
      label="Name"
      variant="outlined"
      required
      InputLabelProps={{
        shrink: true,
        required: false,
      }}
    />
  );
}
