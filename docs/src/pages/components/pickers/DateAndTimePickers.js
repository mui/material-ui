import * as React from 'react';
import TextField from '@material-ui/core/TextField';

export default function DateAndTimePickers() {
  return (
    <form noValidate>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        sx={{ width: 250 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
