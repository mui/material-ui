import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '&.root': {
      height: 100,
      width: 100,
      backgroundColor: 'blue',
    },
    '& .child': {
      height: 8,
      backgroundColor: 'red',
    },
  },
});

export default function HybridCss() {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, 'root')}>
      <div className="child" />
    </div>
  );
}
