import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      '& > *': {
        width: 200,
        marginTop: theme.spacing(2),
      },
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);

export default function ColorTextField() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="standard-secondary"
        label="Standard secondary"
        color="secondary"
      />
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
