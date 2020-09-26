import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/core/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function Variants() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={118} />
    </div>
  );
}
