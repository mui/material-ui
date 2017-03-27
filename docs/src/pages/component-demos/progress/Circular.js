// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
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
      <CircularProgress className={classes.progress} size={50} />
    </div>
  );
}

Circular.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
