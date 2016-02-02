import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';

const styles = {
  errorStyle: {
    color: Colors.orange500,
  },
  hintStyle: {
    color: Colors.orange500,
  },
  floatingLabelStyle: {
    color: Colors.orange500,
  },
  underlineStyle: {
    borderColor: Colors.orange500,
  },
  underlineFocusStyle: {
    borderColor: Colors.orange500,
  },
};

const TextFieldExampleCustomize = () => (
  <div>
    <TextField
      hintText="Styled Hint Text"
      style={styles}
    /><br/>
    <TextField
      hintText="Custom error color"
      errorText="This field is required."
      style={styles}
    /><br/>
    <TextField
      floatingLabelText="Custom label color"
      style={styles}
    /><br/>
    <TextField
      hintText="Custom Underline Color"
      style={styles}
    /><br/>
    <TextField
      hintText="Custom Underline Focus Color"
      style={styles}
    />
  </div>
);

export default TextFieldExampleCustomize;
