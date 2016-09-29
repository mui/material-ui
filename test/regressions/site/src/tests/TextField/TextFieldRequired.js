// @flow weak

import React from 'react';
import TextField, { TextFieldInput, TextFieldLabel } from 'material-ui/TextField';

export default function TextFieldRequired() {
  return (
    <div>
      <TextField required>
         <TextFieldLabel>Test</TextFieldLabel>
         <TextFieldInput />
       </TextField>
      <TextField required>
         <TextFieldLabel>Test</TextFieldLabel>
         <TextFieldInput defaultValue="Hello world" />
       </TextField>
    </div>
  );
}
