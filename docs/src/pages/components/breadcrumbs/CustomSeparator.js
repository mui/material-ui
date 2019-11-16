import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function CustomSeparator() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          Material-UI
        </Link>
        <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
          Core
        </Link>
        <Typography color="textPrimary">Breadcrumb</Typography>
      </Breadcrumbs>
      <Breadcrumbs separator="-" aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          Material-UI
        </Link>
        <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
          Core
        </Link>
        <Typography color="textPrimary">Breadcrumb</Typography>
      </Breadcrumbs>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          Material-UI
        </Link>
        <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
          Core
        </Link>
        <Typography color="textPrimary">Breadcrumb</Typography>
      </Breadcrumbs>
    </div>
  );
}
