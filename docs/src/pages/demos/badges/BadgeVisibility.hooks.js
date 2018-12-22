import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing.unit,
  },
}));

function BadgeVisibility() {
  const classes = useStyles();
  const [invisible, setInvisible] = React.useState(false);

  function handleBadgeVisibility() {
    setInvisible(!invisible);
  }

  return (
    <div className={classes.root}>
      <div className={classes.margin}>
        <Badge color="secondary" badgeContent={4} invisible={invisible}>
          <MailIcon />
        </Badge>
      </div>
      <FormGroup row>
        <FormControlLabel
          control={<Switch color="primary" checked={!invisible} onChange={handleBadgeVisibility} />}
          label="Show Badge"
        />
      </FormGroup>
    </div>
  );
}

export default BadgeVisibility;
