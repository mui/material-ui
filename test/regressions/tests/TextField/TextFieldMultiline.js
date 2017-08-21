// @flow

import * as React from 'react';
import TextField from 'material-ui/TextField';

export default function TextFieldMultiline() {
  return <TextField label="Foo" multiline rows={4} value="Default text" />;
}
