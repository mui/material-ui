import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stack from '@material-ui/core/Stack';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  paper: {
    height: 80,
    width: 80,
  },
});

export default function BasicStack() {
  const classes = useStyles();

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <Paper className={classes.paper} />
      <Paper className={classes.paper} />
      <Paper className={classes.paper} />
    </Stack>
  );
}
