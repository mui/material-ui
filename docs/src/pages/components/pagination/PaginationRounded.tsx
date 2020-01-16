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

export default function PaginationRounded() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={10} shape="rounded" />
      <Pagination count={10} variant="outlined" shape="rounded" />
    </div>
  );
}
