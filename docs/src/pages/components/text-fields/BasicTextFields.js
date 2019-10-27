import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-bare"
          className={classes.textField}
          defaultValue="Bare"
          margin="normal"
          inputProps={{ 'aria-label': 'bare' }}
        />
      </div>
      <div>
        <TextField
          id="filled-bare"
          className={classes.textField}
          defaultValue="Bare"
          margin="normal"
          inputProps={{ 'aria-label': 'bare' }}
          variant="filled"
        />
      </div>
      <div>
        <TextField
          id="outlined-bare"
          className={classes.textField}
          defaultValue="Bare"
          margin="normal"
          inputProps={{ 'aria-label': 'bare' }}
          variant="outlined"
        />
      </div>
    </form>
  );
}
