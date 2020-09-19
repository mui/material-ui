import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function MultilineTextarea() {
  return (
    <TextField
      InputProps={{
        startAdornment: <InputAdornment position="start">Which?</InputAdornment>
      }}
      multiline
      label="Combo box"
      variant="filled"
    />
  )
}
