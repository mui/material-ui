import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > span': {
        margin: theme.spacing(2),
      },
    },
    iconHover: {
      '&:hover': {
        color: red[800],
      },
    },
  }),
);

export default function Icons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Icon>add_circle</Icon>
      <Icon color="primary">add_circle</Icon>
      <Icon color="secondary">add_circle</Icon>
      <Icon color="action">add_circle</Icon>
      <Icon className={classes.iconHover} color="error" style={{ fontSize: 30 }}>
        add_circle
      </Icon>
      <Icon color="disabled" fontSize="large">
        add_circle
      </Icon>
    </div>
  );
}
