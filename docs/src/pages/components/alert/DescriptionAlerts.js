import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function DescriptionAlerts() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert color="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert—check it out!
      </Alert>
      <Alert color="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning alert—check it out!
      </Alert>
      <Alert color="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert—check it out!
      </Alert>
      <Alert color="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert—check it out!
      </Alert>
    </div>
  );
}
