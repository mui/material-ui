import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
      <Pagination count={10} showFirstButton showLastButton />
      <Pagination color="primary" count={10} showFirstButton showLastButton />
      <Pagination color="secondary" count={10} showFirstButton showLastButton />
      <Pagination count={10} showFirstButton showLastButton disabled />
    </div>
  );
}
