import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationRanges() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={10} />
      <Pagination count={10} siblingRange={0} />
      <Pagination count={10} boundaryRange={1} />
      <Pagination count={10} siblingRange={0} boundaryRange={1} />
    </div>
  );
}
