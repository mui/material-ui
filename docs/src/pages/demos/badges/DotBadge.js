import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
});

function DotBadge(props) {
  const { classes } = props;

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

DotBadge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DotBadge);
