import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function FilledHiddenLabelInputAdornment() {
  return (
    <TextField
      hiddenLabel
      id="filled-hidden-label"
      defaultValue="Value"
      variant="filled"
      InputProps={{
        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
      }}
    />
  );
}
