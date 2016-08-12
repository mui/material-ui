// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('FlatButtons', () => ({
  button: {
    margin: '0 10px',
  },
}));

export default function FlatButtons(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <Button className={classes.button}>Default</Button>
      <Button primary className={classes.button}>Primary</Button>
      <Button accent className={classes.button}>Accent</Button>
      <Button disabled className={classes.button}>Disabled</Button>
    </div>
  );
}

FlatButtons.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
