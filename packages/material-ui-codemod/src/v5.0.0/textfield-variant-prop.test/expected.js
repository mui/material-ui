import * as React from 'react';
import TextField from '@material-ui/core/TextField';

export default function TextFieldComponent(props) {
  return (
    <div>
      <TextField {...props} variant="standard" />
      <TextField />
      <TextField variant="standard" />
      <TextField variant="filled" />
    </div>
  );
}
