import * as React from 'react';
import Skeleton from '@material-ui/core/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function Animations() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </div>
  );
}
