import React from 'react';
import PropTypes from 'prop-types';
import AlarmIcon from '@material-ui/icons/Alarm';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    color: theme.palette.text.primary,
  },
  icon: {
    margin: theme.spacing.unit,
  },
});

function SvgMaterialIcons(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AlarmIcon className={classes.icon} />
      <AlarmOffIcon className={classes.icon} />
      <ThreeDRotationIcon className={classes.icon} />
    </div>
  );
}

SvgMaterialIcons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SvgMaterialIcons);
