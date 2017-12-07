import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import MailIcon from 'material-ui-icons/Mail';

const styles = theme => ({
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

function SimpleBadge(props) {
  const { classes } = props;
  return (
    <div>
      <Badge className={classes.badge} badgeContent={4} color="primary">
        <MailIcon />
      </Badge>
      <Badge className={classes.badge} badgeContent={10} color="accent">
        <MailIcon />
      </Badge>
      <IconButton>
        <Badge className={classes.badge} badgeContent={4} color="primary">
          <MailIcon />
        </Badge>
      </IconButton>
    </div>
  );
}

SimpleBadge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBadge);
