import * as React from 'react';
import TextField from '@material-ui/core/TextField';

{
  // https://github.com/mui-org/material-ui/issues/12999
  const defaulted = (
    <TextField InputProps={{ classes: { inputTypeSearch: 'search-input', input: 'input' } }} />
  );
  const standard = (
    <TextField variant="standard" InputProps={{ classes: { inputTypeSearch: 'search-input' } }} />
  );
  const standardOutlinedClassname = (
    <TextField
      variant="standard"
      InputProps={
        {
          // notchedOutline is only used with variant "outlined"
          // FIXME this no longer generates an error in TS 3.2, see https://github.com/Microsoft/TypeScript/issues/28926
          // classes: { inputTypeSearch: 'search-input', notchedOutline: 'notched-outline' }, // $ExpectError
        }
      }
    />
  );

  const filled = (
    <TextField
      variant="filled"
      InputProps={{ classes: { inputAdornedStart: 'adorned-start' } }}
      onChange={event => {
        // type inference for event still works?
        const value = event.target.value; // $ExpectType string
      }}
    />
  );

  const outlined = (
    <TextField variant="outlined" InputProps={{ classes: { notchedOutline: 'notched-outline' } }} />
  );
}
