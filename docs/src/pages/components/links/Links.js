/* eslint-disable no-script-url */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  link: {
    margin: theme.spacing(1),
  },
}));

// This resolves to nothing and doesn't affect browser history
const dudUrl = 'javascript:;';

export default function Links() {
  const classes = useStyles();

  return (
    <Typography>
      <Link href={dudUrl} className={classes.link}>
        Link
      </Link>
      <Link href={dudUrl} color="inherit" className={classes.link}>
        {'color="inherit"'}
      </Link>
      <Link href={dudUrl} variant="body2" className={classes.link}>
        {'variant="body2"'}
      </Link>
    </Typography>
  );
}
