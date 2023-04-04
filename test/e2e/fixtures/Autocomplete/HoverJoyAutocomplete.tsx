import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';

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
