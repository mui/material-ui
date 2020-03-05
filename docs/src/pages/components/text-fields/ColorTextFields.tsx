import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

export default function ColorTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-secondary" label="Standard secondary" color="secondary" />
      <TextField
        id="filled-secondary"
        label="Filled secondary"
        variant="filled"
        color="secondary"
      />
      <TextField
        id="outlined-secondary"
        label="Outlined secondary"
        variant="outlined"
        color="secondary"
      />
    </form>
  );
}
