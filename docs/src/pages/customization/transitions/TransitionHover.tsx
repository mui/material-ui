import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  avatar: {
    cursor: 'pointer',
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.standard,
    }),
    '&:hover': {
      backgroundColor: deepPurple[900],
    },
  },
}));

export default function LetterAvatars() {
  const classes = useStyles();

  return <Avatar className={classes.avatar}>OP</Avatar>;
}
