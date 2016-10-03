// @flow weak

import React from 'react';
import TextField, { TextFieldInput, TextFieldLabel } from 'material-ui/TextField';

export default function TextFieldRequired() {
  return (
    <div>
      <TextField required>
        <TextFieldLabel>Foo</TextFieldLabel>
        <TextFieldInput />
      </TextField>
      <TextField required>
        <TextFieldLabel>Foo</TextFieldLabel>
        <TextFieldInput value="Hello world" />
      </TextField>
      <TextField required>
        <TextFieldLabel>Foo</TextFieldLabel>
        <TextFieldInput value="Hello world" autoFocus />
      </TextField>
    </div>
  );
}
