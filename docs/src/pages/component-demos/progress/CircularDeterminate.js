// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styleSheet = createStyleSheet('CircularDeterminate', theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
}));

function CircularDeterminate(props) {
  const classes = props.classes;
  return (
    <div>
      <CircularProgress className={classes.progress} mode="determinate" value={75} />
      <CircularProgress
        className={classes.progress}
        size={50}
        mode="determinate"
        value={25}
        min={0}
        max={50}
      />
      <CircularProgress className={classes.progress} color="accent" mode="determinate" value={75} />
      <CircularProgress
        className={classes.progress}
        color="accent"
        size={50}
        mode="determinate"
        value={25}
        min={0}
        max={50}
      />
    </div>
  );
}

CircularDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(CircularDeterminate);
