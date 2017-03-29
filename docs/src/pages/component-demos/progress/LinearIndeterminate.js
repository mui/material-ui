// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import { LinearProgress } from 'material-ui/Progress';

const styleSheet = createStyleSheet('LinearIndeterminate', () => ({
  root: {
    width: '100%',
    marginTop: 30,
  },
}));

export default function LinearIndeterminate(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
}

LinearIndeterminate.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
