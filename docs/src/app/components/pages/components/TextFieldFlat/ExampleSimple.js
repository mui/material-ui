import React from 'react';
import TextFieldFlat from 'material-ui/TextFieldFlat';

const makeColoredBackground = (color) => ({
  width: 'auto',
  display: 'block',
  background: color,
  borderRadius: 3,
  padding: 12,
});

const TextFieldExampleSimple = () => (
  <div style={makeColoredBackground('#455A64')}>
    <TextFieldFlat
      hintText="Hint Text"
    />
    <br />
    <br />
    <TextFieldFlat
      hintText="The hint won't wrap. Just see what happens here and here and here."
    />
    <br />
    <br />
    <TextFieldFlat
      defaultValue="Default Value"
    />
    <br />
    <br />
    <TextFieldFlat
      hintText="Password Field"
      type="password"
    />
    <br />
    <br />
    <TextFieldFlat
      hintText="MultiLine with rows: 2 and rowsMax: 4"
      multiLine={true}
      rows={2}
      rowsMax={4}
    />
    <br />
    <br />
    <TextFieldFlat
      hintText="Full width"
      fullWidth={true}
    />
  </div>
);

export default TextFieldExampleSimple;
