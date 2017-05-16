// @flow

import React from 'react';
import PropTypes from 'prop-types';
import AccessAlarmIcon from 'material-ui-icons/AccessAlarm';
import ThreeDRotation from 'material-ui-icons/ThreeDRotation';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('SvgMaterialIcons', (theme) => ({
  icon: {
    margin: theme.spacing.unit,
  },
}));

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

export default withStyles(styleSheet)(SvgMaterialIcons);
