import React from 'react';
import TextField from 'material-ui/lib/text-field';

const TextFieldExampleHint = () => (
  <div>
    <TextField
      hintText="Hint Text" /><br/>
    <TextField
      hintText="Styled Hint Text"
      hintStyle={{color: 'red'}} /><br/><br/>
    <TextField
      hintText="The hint text can be as long as you want, it will wrap." />
  </div>
);

export default TextFieldExampleHint;
