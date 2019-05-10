import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
    marginRight: theme.spacing(3),
  },
}));

function BadgeMax() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Badge className={classes.margin} badgeContent={99} color="primary">
        <MailIcon />
      </Badge>
      <Badge className={classes.margin} badgeContent={100} color="primary">
        <MailIcon />
      </Badge>
      <Badge className={classes.margin} badgeContent={1000} max={999} color="primary">
        <MailIcon />
      </Badge>
    </React.Fragment>
  );
}

export default BadgeMax;
