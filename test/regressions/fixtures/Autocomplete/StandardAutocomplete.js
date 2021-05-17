import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';

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
