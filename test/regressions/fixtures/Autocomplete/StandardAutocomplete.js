import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';

export default function StandardAutocomplete() {
  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        options={[]}
        renderInput={(params) => (
          <TextField {...params} label="Standard autocomplete" variant="standard" />
        )}
      />
    </Box>
  );
}
