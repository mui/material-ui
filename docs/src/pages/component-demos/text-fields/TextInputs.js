// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
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

function TextInputs(props) {
  const classes = props.classes;
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

TextInputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(TextInputs);
