import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    icon: {
      margin: theme.spacing(2),
    },
    iconHover: {
      margin: theme.spacing(2),
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
      <Icon className={classes.icon}>add_circle</Icon>
      <Icon className={classes.icon} color="primary">
        add_circle
      </Icon>
      <Icon className={classes.icon} color="secondary">
        add_circle
      </Icon>
      <Icon className={classes.icon} color="action">
        add_circle
      </Icon>
      <Icon className={classes.iconHover} color="error" style={{ fontSize: 30 }}>
        add_circle
      </Icon>
      <Icon className={classes.icon} color="disabled" fontSize="large">
        add_circle
      </Icon>
    </div>
  );
}
