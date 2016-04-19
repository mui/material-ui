import React from 'react';
import TextField from 'material-ui/TextField';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {orange500} from 'material-ui/styles/colors';

const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
};

const TextFieldExampleCustomize = () => (
  <div>
    <TextField
      hintText="Styled Hint Text"
      hintStyle={styles.errorStyle}
    /><br />
    <TextField
      hintText="Custom error color"
      errorText="This field is required."
      errorStyle={styles.errorStyle}
    /><br />
    <TextField
      hintText="Custom Underline Color"
      underlineStyle={styles.underlineStyle}
    /><br />
    <TextField
      hintText="Custom Underline Focus Color"
      underlineFocusStyle={styles.underlineStyle}
    /><br />
    <TextField
      leftIcon={<ActionGrade color={orange500} />}
      hintText="Left icon"
    />
  </div>
);

export default TextFieldExampleCustomize;
