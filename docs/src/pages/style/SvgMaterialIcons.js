// @flow weak

import React from 'react';
import AccessAlarmIcon from 'material-ui-icons/AccessAlarm';
import ThreeDRotation from 'material-ui-icons/ThreeDRotation';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';

const styleSheet = createStyleSheet('SvgMaterialIcons', (theme) => ({
  icon: {
    margin: theme.spacing.unit,
  },
}));

export default function SvgMaterialIcons(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <AccessAlarmIcon className={classes.icon} />
      <ThreeDRotation className={classes.icon} />
    </div>
  );
}

SvgMaterialIcons.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
