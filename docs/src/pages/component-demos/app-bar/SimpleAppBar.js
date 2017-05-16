// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('SimpleAppBar', {
  root: {
    position: 'relative',
    marginTop: 30,
    width: '100%',
  },
  appBar: {
    position: 'relative',
  },
});

function SimpleAppBar(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography type="title" colorInherit>Title</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SimpleAppBar);
