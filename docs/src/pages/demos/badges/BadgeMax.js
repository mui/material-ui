import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
  },
});

function BadgeMax(props) {
  const { classes } = props;

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

BadgeMax.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BadgeMax);
