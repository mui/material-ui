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
      <Typography>Outlined</Typography>
      <Pagination
        variant="outlined"
        count={10}
        showFirstButton
        showLastButton
      />
      <Typography>Outlined primary</Typography>
      <Pagination
        variant="outlined"
        color="primary"
        count={10}
        showFirstButton
        showLastButton
      />
      <Typography>Outlined secondary</Typography>
      <Pagination
        variant="outlined"
        color="secondary"
        count={10}
        showFirstButton
        showLastButton
      />
      <Typography>Outlined disabled</Typography>
      <Pagination
        variant="outlined"
        count={10}
        showFirstButton
        showLastButton
        disabled
      />
    </div>
  );
}
