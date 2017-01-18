// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/menu';

const styleSheet = createStyleSheet('ButtonAppBar', () => ({
  root: {
    position: 'relative',
    marginTop: 25,
    width: '100%',
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
}));

export default function ButtonAppBar(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton contrast>
            <MenuIcon />
          </IconButton>
          <Text type="title" colorInherit>Title</Text>
          <div className={classes.flex} />
          <Button contrast>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
