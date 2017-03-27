// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Icon from 'material-ui/Icon';

const styleSheet = createStyleSheet('Icons', () => ({
  icons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '70%',
  },
}));

export default function Icons(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.icons}>
      <Icon>add_circle</Icon>
      <Icon accent>add_circle</Icon>
      <Icon action>add_circle</Icon>
      <Icon contrast>add_circle</Icon>
      <Icon disabled>add_circle</Icon>
      <Icon error>add_circle</Icon>
      <Icon primary>add_circle</Icon>
    </div>
  );
}

Icons.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
