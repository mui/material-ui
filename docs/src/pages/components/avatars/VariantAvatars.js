import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, green } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  rounded: {
    color: '#fff',
    backgroundColor: green[500],
  },
}));

export default function VariantAvatars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar variant="square" className={classes.square}>
        N
      </Avatar>
      <Avatar variant="rounded" className={classes.rounded}>
        <AssignmentIcon />
      </Avatar>
    </div>
  );
}
