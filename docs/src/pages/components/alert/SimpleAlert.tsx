import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle, AlertContent } from '@material-ui/lab';

/* eslint-disable react/jsx-filename-extension */

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

/*
      commented out while we figure out https://github.com/mui-org/material-ui/issues/13875

      <AlertActions>
        <Button variant="contained" color="primary">
          Refresh
        </Button>
        <Button component="a" href="mailto:support@foo.bar" color="primary">
          Contact support
        </Button>
      </AlertActions>
*/

export default function SimpleAlert() {
  const onClose = () => {
    console.log('TEMP: clicking close');
  };

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Alert onClose={onClose} type="error">
        <AlertTitle>Error!</AlertTitle>
        <AlertContent>Your request for the ultimate cup of coffee has been denied!</AlertContent>
      </Alert>

      <Alert onClose={onClose} type="warning">
        <AlertTitle>Warning!</AlertTitle>
        <AlertContent>
          This is a warning that Captain Spectacular has set a course to the benevolent hive mine 9!
        </AlertContent>
      </Alert>

      <Alert onClose={onClose} type="info">
        <AlertTitle>Informational Notes</AlertTitle>
        <AlertContent>
          Modular forms and elliptic curves! Infinite fire revolving around infinite parallels.
          Fractals of infinite reality, each cascading, gliding in an infinite wheel.
        </AlertContent>
      </Alert>

      <Alert onClose={onClose} type="success">
        <AlertTitle>Success!</AlertTitle>
        <AlertContent>
          You fetched the ultimate cup of coffee in less than five Earth minutes!
        </AlertContent>
      </Alert>
    </Box>
  );
}
