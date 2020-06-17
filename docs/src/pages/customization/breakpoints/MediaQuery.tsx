import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        backgroundColor: theme.palette.secondary.main,
      },
      [theme.breakpoints.up('md')]: {
        backgroundColor: theme.palette.primary.main,
      },
      [theme.breakpoints.up('lg')]: {
        backgroundColor: green[500],
      },
    },
  }),
);

export default function MediaQuery() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography>{'down(sm): red'}</Typography>
      <Typography>{'up(md): blue'}</Typography>
      <Typography>{'up(lg): green'}</Typography>
    </div>
  );
}
