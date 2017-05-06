// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';

const styleSheet = createStyleSheet('LinearIndeterminate', () => ({
  root: {
    width: '100%',
    marginTop: 30,
  },
}));

function LinearIndeterminate(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
}

LinearIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(LinearIndeterminate);
