/* eslint-disable jsx-a11y/anchor-is-valid */
import '../src/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20),
  },
}));

function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Material-UI
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        about page
      </Typography>
      <Typography gutterBottom>
        <Link href="/">
          <a>Go to the main page</a>
        </Link>
      </Typography>
      <Button variant="contained" color="primary">
        Do nothing button
      </Button>
    </div>
  );
}

export default About;
