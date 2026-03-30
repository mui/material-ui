import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function StandardTextField() {
  return (
    <div>
      <TextField label="Standard" variant="standard" />
      <TextField label="Standard disabled" variant="standard" disabled />
      <TextField label="Standard error" variant="standard" error />
      <TextField label="Standard required" variant="standard" required />
    </div>
  );
}
