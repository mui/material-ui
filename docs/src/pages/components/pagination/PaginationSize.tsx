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
      <Typography>Small</Typography>
      <Pagination
        size="small"
        count={10}
        showFirstButton
        showLastButton
      />
      <Typography>Medium</Typography>
      <Pagination
        count={10}
        showFirstButton
        showLastButton
      />
      <Typography>Large</Typography>
      <Pagination
        size="large"
        count={10}
        showFirstButton
        showLastButton
      />
    </div>
  );
}
