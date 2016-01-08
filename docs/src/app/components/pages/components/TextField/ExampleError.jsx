import React from 'react';
import TextField from 'material-ui/lib/text-field';

const TextFieldExampleError = () => (
  <div>
    <TextField
      hintText="Hint Text"
      errorText="The error text can be as long as you want, it will wrap." />
    <br/>
    <TextField
      hintText="Hint Text"
      errorText="This field is required" />
  </div>
);

export default TextFieldExampleError;
