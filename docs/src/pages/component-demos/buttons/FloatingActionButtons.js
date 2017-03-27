// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

const styleSheet = createStyleSheet('FloatingActionButtons', (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
}));

export default function FloatingActionButtons(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <Button fab primary className={classes.button}>
        <AddIcon />
      </Button>
      <Button fab accent className={classes.button}>
        <ModeEditIcon />
      </Button>
    </div>
  );
}

FloatingActionButtons.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
