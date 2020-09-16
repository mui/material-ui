import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function AutocompleteTextField() {
  return (
    <Autocomplete
      options={[]}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: <InputAdornment position="start">Which?</InputAdornment>,
          }}
          label="Combo box"
          variant="filled"
        />
      )}
    />
  );
}
