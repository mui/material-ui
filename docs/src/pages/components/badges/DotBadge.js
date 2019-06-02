import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
}));

export default function DotBadge() {
  const classes = useStyles();

  return (
    <div>
      <div>
        <Badge className={classes.margin} color="primary" variant="dot">
          <MailIcon />
        </Badge>
        <Badge className={classes.margin} color="secondary" variant="dot">
          <MailIcon />
        </Badge>
      </div>
      <Badge color="primary" className={classes.margin} variant="dot">
        <Typography>Typography</Typography>
      </Badge>
    </div>
  );
}
