import * as React from 'react';
import TextField from '@material-ui/core/TextField';

export default function DatePickers() {
  return (
    <form noValidate>
      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2017-05-24"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
