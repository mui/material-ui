import React from 'react';
import TextField from 'material-ui/lib/text-field';

const TextFieldExampleMultiLine = () => (
  <div>
    <TextField
      hintText="Message Field"
      floatingLabelText="MultiLine with Error Text"
      multiLine={true}
      errorText="This field is required."
      rows={5} /><br/>
    <TextField
      rows={2}
      rowsMax={4}
      hintText="Hint Text (MultiLine) with rows: 2 and rowsMax: 4."
      multiLine={true} />
  </div>
);

export default TextFieldExampleMultiLine;
