import React from 'react';
import TextField from '@material-ui/core/TextField';

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
