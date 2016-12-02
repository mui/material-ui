// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('RaisedButtons', () => ({
  button: {
    margin: '0 10px',
  },
}));

export default function RaisedButtons(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <Button raised className={classes.button}>Default</Button>
      <Button raised primary className={classes.button}>Primary</Button>
      <Button raised accent className={classes.button}>Accent</Button>
      <Button raised contrast className={classes.button}>Contrast</Button>
      <Button
        raised
        disabled
        accent
        className={classes.button}
      >
        Disabled
      </Button>
    </div>
  );
}

RaisedButtons.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
