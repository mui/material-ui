import { Autocomplete, TextField } from '@mui/material';
import * as React from 'react';

function HoverAutoComplete() {
  return (
    <Autocomplete
      open
      id="combo-box-demo"
      options={['one', 'two', 'three', 'four', 'five', 'six', 'seven']}
      sx={{ width: 300 }}
      ListboxProps={{ sx: { height: '100px' } }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}

export default HoverAutoComplete;
