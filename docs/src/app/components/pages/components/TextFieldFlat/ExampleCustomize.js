import React from 'react';
import TextFieldFlat from 'material-ui/TextFieldFlat';
import {orange500, indigo900, blue900} from 'material-ui/styles/colors';

const styles = {
  errorStyle: {
    color: orange500,
  },
  backgroundStyle: {
    background: indigo900,
  },
  hintStyle: {
    color: blue900,
  },
};

const makeColoredBackground = (color) => ({
  width: 'auto',
  display: 'block',
  background: color,
  padding: 12,
});

const TextFieldExampleCustomize = () => (
  <div>
    <div style={makeColoredBackground('#455A64')}>
      <TextFieldFlat
        hintText="Styled Hint Text"
        hintStyle={styles.hintStyle}
      />
    </div>
    <div style={makeColoredBackground('#455A64')}>
      <TextFieldFlat
        hintText="Custom Error Style"
        errorText="This field is required."
        errorStyle={styles.errorStyle}
      />
    </div>
    <div style={makeColoredBackground('#FDA36A')}>
      <TextFieldFlat
        hintText="Dark Background Style"
        backgroundType="Dark"
      />
    </div>
    <div style={makeColoredBackground('#6EB9FC')}>
      <TextFieldFlat
        hintText="Dark Background Style"
        backgroundType="Dark"
      />
    </div>
    <div style={makeColoredBackground('#383A6D')}>
      <TextFieldFlat
        hintText="Light Background Style"
        backgroundType="Light"
      />
    </div>
    <div style={makeColoredBackground('#455A64')}>
      <TextFieldFlat
        hintText="Light Background Style"
        backgroundType="Light"
      />
    </div>
  </div>
);

export default TextFieldExampleCustomize;
