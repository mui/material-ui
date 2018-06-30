import React from 'react';
import PropTypes from 'prop-types';
import AlarmIcon from '@material-ui/icons/Alarm';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';
import FourKIcon from '@material-ui/icons/FourK';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import { withStyles } from '@material-ui/core/styles';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';

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
      <FourKIcon className={classes.icon} />
      <ThreeSixtyIcon className={classes.icon} />
      <BuildOutlinedIcon className={classes.icon} />
    </div>
  );
}

SvgMaterialIcons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SvgMaterialIcons);
