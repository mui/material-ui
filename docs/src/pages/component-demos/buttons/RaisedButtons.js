// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('RaisedButtons', (theme) => ({
  button: {
    margin: theme.spacing.unit,
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
  styleManager: customPropTypes.muiRequired,
};
