import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default function HelperTextMisaligned() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        helperText="Please enter your name"
        id="demo-helper-text-misaligned"
        label="Name"
        variant="standard"
      />
      <TextField
        id="demo-helper-text-misaligned-no-helper"
        label="Name"
        variant="standard"
      />
    </div>
  );
}
