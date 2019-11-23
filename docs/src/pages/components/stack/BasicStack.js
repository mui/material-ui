import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stack from '@material-ui/core/Stack';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    // Children (Paper)
    '& > *': {
      height: 80,
      width: 80,
    },
  },
});

export default function BasicStack() {
  const classes = useStyles();

  return (
    <Stack justify="center" spacing={2} className={classes.root}>
      <Paper />
      <Paper />
      <Paper />
    </Stack>
  );
}
