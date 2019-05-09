import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress />
      <br />
      <LinearProgress color="secondary" />
    </div>
  );
}

export default LinearIndeterminate;
