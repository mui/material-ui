import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function MultilineTextField() {
  return (
    <div>
      <TextField label="multiline small" multiline size="small" />
      <TextField label="singleline small" size="small" />
    </div>
  );
}
