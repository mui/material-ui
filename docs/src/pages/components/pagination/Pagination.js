import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function BasicPagination() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>Standard</Typography>
      <Pagination count={10} showFirstButton showLastButton />
      <Typography>Primary</Typography>
      <Pagination color="primary" count={10} showFirstButton showLastButton />
      <Typography>Secondary</Typography>
      <Pagination color="secondary" count={10} showFirstButton showLastButton />
      <Typography>Disabled</Typography>
      <Pagination count={10} showFirstButton showLastButton disabled />
    </div>
  );
}
