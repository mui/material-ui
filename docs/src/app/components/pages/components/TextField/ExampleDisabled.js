import React from 'react';
import TextField from 'material-ui/TextField';

const TextFieldExampleDisabled = () => (
  <div>
    <TextField
      disabled={true}
      hintText="Disabled Hint Text"
    /><br />
    <TextField
      disabled={true}
      id="text-field-disabled"
      defaultValue="Disabled Value"
    /><br />
    <TextField
      disabled={true}
      hintText="Disabled Hint Text"
      floatingLabelText="Floating Label Text"
    /><br />
    <TextField
      disabled={true}
      hintText="Disabled Hint Text"
      defaultValue="Disabled With Floating Label"
      floatingLabelText="Floating Label Text"
    />
  </div>
);

export default TextFieldExampleDisabled;
