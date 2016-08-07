// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import IconButton from 'material-ui/IconButton';

const styleSheet = createStyleSheet('IconButtons', () => ({
  button: {
    margin: '0 10px',
  },
}));

export default function IconButtons(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <IconButton className={classes.button}>delete</IconButton>
      <IconButton className={classes.button}>add_shopping_cart</IconButton>
    </div>
  );
}

IconButtons.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

