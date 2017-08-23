// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import AccessAlarmIcon from 'material-ui-icons/AccessAlarm';
import ThreeDRotation from 'material-ui-icons/ThreeDRotation';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
  },
});

function SvgMaterialIcons(props) {
  const classes = props.classes;
  return (
    <div>
      <AccessAlarmIcon className={classes.icon} />
      <ThreeDRotation className={classes.icon} />
    </div>
  );
}

SvgMaterialIcons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SvgMaterialIcons);
