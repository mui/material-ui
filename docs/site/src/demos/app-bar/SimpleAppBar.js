// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';

const styleSheet = createStyleSheet('SimpleAppBar', () => ({
  root: {
    position: 'relative',
    marginTop: 30,
    width: '100%',
  },
  appBar: {
    position: 'relative',
  },
}));

export default function SimpleAppBar(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Text type="title" colorInherit>Title</Text>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
