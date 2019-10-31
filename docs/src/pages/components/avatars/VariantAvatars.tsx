import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, green } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  avatar: {
    margin: 12,
  },
  orangeAvatar: {
    margin: 12,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  greenAvatar: {
    margin: 12,
    color: '#fff',
    backgroundColor: green[500],
  },
});

export default function VariantAvatars() {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Avatar
        variant="circle"
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        className={classes.avatar}
      />
      <Avatar variant="square" className={classes.orangeAvatar}>
        N
      </Avatar>
      <Avatar variant="round" className={classes.greenAvatar}>
        <AssignmentIcon />
      </Avatar>
    </Grid>
  );
}
