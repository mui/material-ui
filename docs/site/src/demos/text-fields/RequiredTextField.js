// @flow weak

import React from 'react';
import TextField, { TextFieldInput, TextFieldLabel } from 'material-ui/TextField';

export default function RequiredTextField() {
  return (
    <div>
      <TextField>
        <TextFieldLabel htmlFor="required" required>
          First Name
        </TextFieldLabel>
        <TextFieldInput id="required" />
      </TextField>
      <TextField error>
        <TextFieldLabel htmlFor="validation" required>
          Last Name
        </TextFieldLabel>
        <TextFieldInput id="validation" />
      </TextField>
    </div>
  );
}
