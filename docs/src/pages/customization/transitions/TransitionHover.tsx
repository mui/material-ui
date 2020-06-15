import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  avatar: {
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create(['background-color', 'transform'], {
      duration: theme.transitions.duration.standard,
    }),
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      transform: 'scale(1.3)',
    },
  },
}));

export default function TransitionHover() {
  const classes = useStyles();

  return <Avatar className={classes.avatar}>OP</Avatar>;
}
