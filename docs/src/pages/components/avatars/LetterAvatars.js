import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
}));

export default function LetterAvatars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar>H</Avatar>
      <Avatar className={classes.orange}>N</Avatar>
      <Avatar className={classes.purple}>OP</Avatar>
    </div>
  );
}
