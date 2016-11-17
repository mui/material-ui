// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Radio from 'material-ui/Radio';

const styleSheet = createStyleSheet('BasicRadioInput', () => ({
  radio: {
    margin: '0 10px',
  },
}));

export default function BasicRadioInput(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <Radio
        label="Hello"
        value="world"
        className={classes.radio}
      />
      <Radio
        label="Foo"
        placeholder="bar"
        className={classes.radio}
        checked
      />
      <Radio
        label="Disabled"
        value="disabled"
        disabled
        className={classes.radio}
      />
    </div>
  );
}

BasicRadioInput.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
