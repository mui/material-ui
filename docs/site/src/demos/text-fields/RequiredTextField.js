// @flow weak

import React from 'react';
import TextField, { TextFieldInput, TextFieldLabel } from 'material-ui/TextField';

export default function RequiredTextField() {
  return (
    <TextField>
      <TextFieldLabel htmlFor="required" required>
        Name
      </TextFieldLabel>
      <TextFieldInput id="required" />
    </TextField>
  );
}
