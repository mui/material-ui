import React from 'react';
import TextFieldFlat from 'material-ui/TextFieldFlat';

const TextFieldExampleError = () => (
  <div>
    <TextFieldFlat
      hintText="Hint Text"
      errorText="This field is required"
    /><br />
    <TextFieldFlat
      hintText="Hint Text"
      errorText="The error text can be as long as you want, it will wrap."
    /><br />
    <TextFieldFlat
      hintText="Dark Background Type"
      backgroundType="Dark"
      errorText="This field is required"
    /><br />
    <TextFieldFlat
      hintText="Multiline with error"
      errorText="This field is required."
      multiLine={true}
      rows={2}
    /><br />
  </div>
);

export default TextFieldExampleError;
