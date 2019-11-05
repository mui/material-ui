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

export default function ColorTextField() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-basic"
          className={classes.textField}
          label="Standard secondary"
          margin="normal"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          id="filled-basic"
          className={classes.textField}
          label="Filled secondary"
          margin="normal"
          variant="filled"
          color="secondary"
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="Outlined secondary"
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </div>
    </form>
  );
}
