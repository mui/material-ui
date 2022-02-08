import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function StandardAutocomplete() {
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        options={[]}
        renderInput={(params) => (
          <TextField {...params} label="Standard autocomplete" variant="standard" />
        )}
      />
    </div>
  );
}
