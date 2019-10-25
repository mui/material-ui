/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  link: {
    margin: theme.spacing(1),
  },
}));

export default function Links() {
  const classes = useStyles();
  const preventDefault = event => event.preventDefault();

  return (
    <Typography>
      <Link href="#" onClick={preventDefault} className={classes.link}>
        Link
      </Link>
      <Link href="#" onClick={preventDefault} color="inherit" className={classes.link}>
        {'color="inherit"'}
      </Link>
      <Link href="#" onClick={preventDefault} variant="body2" className={classes.link}>
        {'variant="body2"'}
      </Link>
    </Typography>
  );
}
