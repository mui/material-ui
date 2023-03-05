import { Autocomplete, TextField } from '@mui/material';
import * as React from 'react';

function HoverMaterialAutocomplete() {
  return (
    <Autocomplete
      open
      options={['one', 'two', 'three', 'four', 'five']}
      sx={{ width: 300 }}
      ListboxProps={{ sx: { height: '100px' } }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}

export default HoverMaterialAutocomplete;
