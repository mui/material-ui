import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';

const options = ['Option 1', 'Option 2'];

export default function CustomInputAutocomplete() {
  return (
    <label>
      Value:{' '}
      <Autocomplete
        sx={{
          display: 'inline-block',
          '& input': {
            width: 200,
            bgcolor: 'background.paper',
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
          },
        }}
        id="custom-input-demo"
        options={options}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input type="text" {...params.inputProps} />
          </div>
        )}
      />
    </label>
  );
}
