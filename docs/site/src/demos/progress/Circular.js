// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import { CircularProgress } from 'material-ui/Progress';

const styleSheet = createStyleSheet('Circular', () => ({
  progress: {
    margin: '0 10px',
  },
}));

export default function Circular(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <CircularProgress className={classes.progress} />
      <CircularProgress className={classes.progress} size={50} thickness={5} />
    </div>
  );
}

Circular.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
