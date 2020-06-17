import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';

const options = ['Option 1', 'Option 2'];

export default function CustomInputAutocomplete() {
  return (
    <Autocomplete
      id="custom-input-demo"
      options={options}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <input style={{ width: 200 }} type="text" {...params.inputProps} />
        </div>
      )}
    />
  );
}
