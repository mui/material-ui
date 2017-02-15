// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('FlatButtons', (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
}));

export default function FlatButtons(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <Button className={classes.button}>Default</Button>
      <Button primary className={classes.button}>Primary</Button>
      <Button accent className={classes.button}>Accent</Button>
      <Button contrast className={classes.button}>Contrast</Button>
      <Button disabled className={classes.button}>Disabled</Button>
    </div>
  );
}

FlatButtons.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
