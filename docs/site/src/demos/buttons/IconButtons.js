// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import AlarmIcon from 'material-ui-icons/Alarm';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';

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
        <DeleteIcon />
      </IconButton>
      <IconButton className={classes.button} disabled>
        <DeleteIcon />
      </IconButton>
      <IconButton accent className={classes.button}>
        <AlarmIcon />
      </IconButton>
      <IconButton contrast className={classes.button}>
        <AddShoppingCartIcon />
      </IconButton>
    </div>
  );
}

IconButtons.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
