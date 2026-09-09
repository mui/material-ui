import * as React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    animation: '$pulse 1.5s ease-in-out infinite',
    color: theme.palette.primary.main,
  },
  '@keyframes pulse': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0.4,
    },
  },
}));

export default function Demo() {
  const classes = useStyles();
  return <div className={classes.root}>Hello</div>;
}
