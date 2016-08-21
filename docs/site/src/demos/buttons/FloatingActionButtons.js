// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Button from 'material-ui/Button';

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
        <span className="material-icons">add</span>
      </Button>
      <Button fab accent className={classes.button}>
        <span className="material-icons">mode_edit</span>
      </Button>
    </div>
  );
}

FloatingActionButtons.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};

