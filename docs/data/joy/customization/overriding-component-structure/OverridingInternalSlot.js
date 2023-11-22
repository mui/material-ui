import * as React from 'react';
import Box from '@mui/joy/Box';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteListbox from '@mui/joy/AutocompleteListbox';

export default function OverridingInternalSlot() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 320 }}>
      <Autocomplete
        open
        multiple
        disableClearable
        placeholder="Type to search"
        options={[
          { label: '🆘 Need help' },
          { label: '✨ Improvement' },
          { label: '🚀 New feature' },
          { label: '🐛 Bug fix' },
        ]}
        slots={{
          listbox: AutocompleteListbox,
        }}
      />
    </Box>
  );
}
