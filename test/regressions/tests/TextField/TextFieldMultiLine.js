// @flow weak

import React from 'react';
import TextField from 'material-ui/TextField';

export default function TextFieldError() {
  return (
    <div>
      <TextField
        label="Foo"
        multiLine
        rows={4}
        value="Default text"
      />
    </div>
  );
}
