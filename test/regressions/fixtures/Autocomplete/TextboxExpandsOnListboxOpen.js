import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function StandardAutocomplete() {
  return (
    <div style={{ height: 220 }}>
      <Autocomplete
        multiple
        limitTags={2}
        options={['One', 'Two', 'Three']}
        defaultValue={['One', 'Two', 'Three']}
        renderInput={(params) => <TextField {...params} />}
        sx={{ width: 300 }}
      />
    </div>
  );
}
