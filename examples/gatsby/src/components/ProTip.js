import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(6, 0, 3),
  },
}));

export default function ProTip() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      Pro tip: See more{' '}
      on the Material-UI documentation.
    </div>
  );
}
