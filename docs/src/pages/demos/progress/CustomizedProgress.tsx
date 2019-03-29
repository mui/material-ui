import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    progress: {
      margin: theme.spacing(2),
      color: '#00695c',
    },
    linearColorPrimary: {
      backgroundColor: '#b2dfdb',
    },
    linearBarColorPrimary: {
      backgroundColor: '#00695c',
    },
    linearProgressDeterminate: {
      margin: `${theme.spacing(1)}px auto 0`,
      height: 10,
      backgroundColor: lighten('#ff6c5c', 0.5),
    },
    linearProgressDeterminateBar: {
      borderRadius: 20,
      backgroundColor: '#ff6c5c',
    },
    // Reproduce the Facebook spinners.
    facebook: {
      margin: theme.spacing(2),
      position: 'relative',
    },
    facebook1: {
      color: '#eef3fd',
    },
    facebook2: {
      color: '#6798e5',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
  });

export type Props = WithStyles<typeof styles>;

function CustomizedProgress(props: Props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <CircularProgress className={classes.progress} size={30} thickness={5} />
      <LinearProgress
        classes={{
          colorPrimary: classes.linearColorPrimary,
          barColorPrimary: classes.linearBarColorPrimary,
        }}
      />
      <LinearProgress
        variant="determinate"
        color="secondary"
        value={50}
        classes={{
          root: classes.linearProgressDeterminate,
          bar: classes.linearProgressDeterminateBar,
        }}
      />
      <div className={classes.facebook}>
        <CircularProgress
          variant="determinate"
          value={100}
          className={classes.facebook1}
          size={24}
          thickness={4}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.facebook2}
          size={24}
          thickness={4}
        />
      </div>
    </Paper>
  );
}

CustomizedProgress.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(CustomizedProgress);
