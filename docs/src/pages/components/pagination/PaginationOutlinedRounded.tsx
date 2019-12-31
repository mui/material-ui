import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function BasicPagination() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>Rounded outlined standard</Typography>
      <Pagination
        variant="outlined"
        shape="rounded"
        count={10}
        showFirstButton
        showLastButton
      />
      <Typography>Rounded outlined primary</Typography>
      <Pagination
        variant="outlined"
        shape="rounded"
        color="primary"
        count={10}
        showFirstButton
        showLastButton
      />
      <Typography>Rounded outlined secondary</Typography>
      <Pagination
        variant="outlined"
        shape="rounded"
        color="secondary"
        count={10}
        showFirstButton
        showLastButton
      />
      <Typography>Rounded outlined disabled</Typography>
      <Pagination
        variant="outlined"
        shape="rounded"
        count={10}
        showFirstButton
        showLastButton
        disabled
      />
    </div>
  );
}
