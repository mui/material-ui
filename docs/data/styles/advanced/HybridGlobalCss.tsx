import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';

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

export default function HybridGlobalCss() {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, 'root')}>
      <div className="child" />
    </div>
  );
}
