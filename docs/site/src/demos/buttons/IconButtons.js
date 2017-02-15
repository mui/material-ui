// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

const styleSheet = createStyleSheet('IconButtons', (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
}));

export default function IconButtons(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <IconButton className={classes.button}>
        delete
      </IconButton>
      <IconButton className={classes.button} disabled>
        delete
      </IconButton>
      <IconButton accent className={classes.button}>
        <Icon>alarm</Icon>
      </IconButton>
      <IconButton contrast className={classes.button}>
        add_shopping_cart
      </IconButton>
    </div>
  );
}

IconButtons.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
