// @flow weak

import React from 'react';
import TextField from 'material-ui/TextField';

export default function TextFieldMultiLine() {
  return (
    <div>
      <TextField
        label="Foo"
        multiline
        rows={4}
        value="Default text"
      />
    </div>
  );
}
