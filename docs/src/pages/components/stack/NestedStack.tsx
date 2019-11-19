import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stack from '@material-ui/core/Stack';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  paper: {
    height: 140,
    width: 100,
  },
});

export default function BasicStack() {
  const classes = useStyles();


  return (
    <Stack justify="center" spacing={2}>
      {[0, 1, 2].map(value => (
        <Stack key={value} direction="column" spacing={2}>
          {[0, 1, 2].map(value => (
            <Paper key={value} className={classes.paper} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
}
