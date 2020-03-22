import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > span': {
      margin: theme.spacing(2),
    },
  },
}));

export default function Icons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Icon>add_circle</Icon>
      <Icon color="primary">add_circle</Icon>
      <Icon color="secondary">add_circle</Icon>
      <Icon style={{ color: green[500] }}>add_circle</Icon>
      <Icon fontSize="small">add_circle</Icon>
      <Icon style={{ fontSize: 30 }}>add_circle</Icon>
    </div>
  );
}
