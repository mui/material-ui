import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function TextFieldMargin() {
  return (
    <div style={{ display: 'flex' }}>
      <TextField label="Dense" defaultValue="Default Value" margin="dense" />
      <TextField style={{ position: 'absolute ' }} label="Dense" margin="dense" />
    </div>
  );
}
