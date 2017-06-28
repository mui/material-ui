// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import InputLabel from 'material-ui/Input/InputLabel';

const styleSheet = createStyleSheet('InputLabels', () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 20, // so transform doesn't let things get cut off
  },
}));

export default function InputLabels(props, context) {
  const classes = context.styleManager.render(styleSheet);

  return (
    <div className={classes.container}>
      <InputLabel shrink>First Name Shrunk</InputLabel>
      <InputLabel>First Name</InputLabel>
      <InputLabel focused>Required</InputLabel>
      <InputLabel focused required>
        Focused Required
      </InputLabel>
      <InputLabel required>Required</InputLabel>
      <InputLabel error>Error</InputLabel>
      <InputLabel required error>
        Required Error
      </InputLabel>
    </div>
  );
}

InputLabels.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
