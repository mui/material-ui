// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Input from 'material-ui/Input/Input';

const styleSheet = createStyleSheet('TextInputs', () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: 10,
  },
}));

export default function TextInputs(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.container}>
      <Input
        defaultValue="Hello world"
        className={classes.input}
      />
      <Input
        placeholder="Placeholder"
        className={classes.input}
      />
      <Input
        value="Disabled"
        className={classes.input}
        disabled
      />
      <Input
        defaultValue="Error"
        className={classes.input}
        error
      />
    </div>
  );
}

TextInputs.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
