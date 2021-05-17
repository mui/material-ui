import * as React from 'react';
import TextField from '@material-ui/core/TextField';

export default function TimePickers() {
  return (
    <form noValidate>
      <TextField
        id="time"
        label="Alarm clock"
        type="time"
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
    </form>
  );
}
