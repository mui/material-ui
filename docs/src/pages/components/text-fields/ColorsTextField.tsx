import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function ColorsTextField() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField id="color-primary-standard" label="Color primary" />
      <TextField id="color-secondary-standard" label="Color secondary" color="secondary" />
      <br />
      <TextField id="color-primary-outlined" label="Color primary" variant="outlined" />
      <TextField
        id="color-secondary-outlined"
        label="Color secondary"
        variant="outlined"
        color="secondary"
      />
      <br />
      <TextField id="color-primary-filled" label="Color primary" variant="filled" />
      <TextField
        id="color-secondary-filled"
        label="Color secondary"
        variant="filled"
        color="secondary"
      />
    </div>
  );
}
