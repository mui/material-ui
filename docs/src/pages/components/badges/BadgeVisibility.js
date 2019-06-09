import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  margin: {
    margin: theme.spacing(1),
  },
  divider: {
    width: '100%',
  },
  row: {
    marginTop: theme.spacing(2),
  },
}));

export default function BadgeVisibility() {
  const classes = useStyles();
  const [invisible, setInvisible] = React.useState(false);

  function handleBadgeVisibility() {
    setInvisible(!invisible);
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <Badge color="secondary" badgeContent={4} invisible={invisible} className={classes.margin}>
          <MailIcon />
        </Badge>
        <Badge color="secondary" variant="dot" invisible={invisible} className={classes.margin}>
          <MailIcon />
        </Badge>
      </div>
      <FormGroup row>
        <FormControlLabel
          control={<Switch color="primary" checked={!invisible} onChange={handleBadgeVisibility} />}
          label="Show Badge"
        />
      </FormGroup>
      <Divider className={classes.divider} />
      <div className={classes.row}>
        <Badge color="secondary" badgeContent={0} className={classes.margin}>
          <MailIcon />
        </Badge>
        <Badge color="secondary" badgeContent={0} showZero className={classes.margin}>
          <MailIcon />
        </Badge>
      </div>
    </div>
  );
}
