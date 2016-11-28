// @flow weak

import React from 'react';
import TextField, { TextFieldInput, TextFieldLabel } from 'material-ui/TextField';

export default function TextFieldError() {
  return (
    <div>
      <TextField error>
        <TextFieldLabel>
          Foo
        </TextFieldLabel>
        <TextFieldInput />
      </TextField>
      <TextField error>
        <TextFieldLabel>
          Foo
        </TextFieldLabel>
        <TextFieldInput value="Hello world" />
      </TextField>
    </div>
  );
}
