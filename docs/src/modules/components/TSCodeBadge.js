import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';

const styles = {
  badge: {
    // move slightly right so that the logo is not partially behind the "!"
    // this way the demo background is the only background of "!"
    right: -12,
  },
};

function TSCodeBadge({ children, classes, outdatedTS }) {
  if (!outdatedTS) {
    return children;
  }

  return (
    <Badge badgeContent={<WarningIcon color="error" />} classes={{ badge: classes.badge }}>
      {children}
    </Badge>
  );
}

TSCodeBadge.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object,
  outdatedTS: PropTypes.bool,
};

export default withStyles(styles)(TSCodeBadge);
