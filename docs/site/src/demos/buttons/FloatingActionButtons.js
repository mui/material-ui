// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui/svg-icons/content/add';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';

const styleSheet = createStyleSheet('FloatingActionButtons', () => ({
  button: {
    margin: '0 10px',
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
  styleManager: PropTypes.object.isRequired,
};
