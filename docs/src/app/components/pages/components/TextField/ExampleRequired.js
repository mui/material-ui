import React from 'react';
import TextField from 'material-ui/TextField';

const TextFieldExampleRequired = () => (
  <div>
    <TextField
      floatingLabelText="Floating Label Text"
      required={true}
    /><br />
    <TextField
      floatingLabelAsteriskStyle={{color: 'red'}}
      floatingLabelText="Floating Label Text"
      required={true}
    />
  </div>
);

export default TextFieldExampleRequired;
