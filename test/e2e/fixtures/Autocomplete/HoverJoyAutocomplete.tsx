import { Autocomplete } from '@mui/joy';
import * as React from 'react';

function HoverJoyAutocomplete() {
  return (
    <Autocomplete
      open
      options={['one', 'two', 'three', 'four', 'five']}
      sx={{ width: 300 }}
      slotProps={{ listbox: { sx: { height: '100px' } } }}
    />
  );
}

export default HoverJoyAutocomplete;
