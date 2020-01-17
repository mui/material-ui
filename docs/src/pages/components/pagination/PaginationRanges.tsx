import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function PaginationRanges() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={12} siblingRange={0} />
      <Pagination count={12} /> {/* Default: siblingRange={1} boundaryRange={0} */}
      <Pagination count={12} siblingRange={0} boundaryRange={1} />
      <Pagination count={12} boundaryRange={1} />
    </div>
  );
}
