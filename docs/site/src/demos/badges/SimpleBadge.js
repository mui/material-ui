// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Badge from 'material-ui/Badge';
import Icon from 'material-ui/Icon';

const styleSheet = createStyleSheet('SimpleBadge', (theme) => ({
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
}));

export default function SimpleBadge(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <Badge
        className={classes.badge}
        badgeContent={4}
        primary
      >
        <Icon>mail</Icon>
      </Badge>
      <Badge
        className={classes.badge}
        badgeContent={10}
        accent
      >
        <Icon>folder</Icon>
      </Badge>
    </div>
  );
}

SimpleBadge.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
