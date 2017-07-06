// @flow

import React from 'react';
import TextField from 'material-ui/TextField';

export default function TextFieldMargin() {
  return (
    <div>
      <TextField label="Foo" helperText="Bar" />
      <TextField label="Foo" helperText="Bar" margin="dense" />
      <TextField label="Foo" helperText="Bar" margin="normal" />
    </div>
  );
}
