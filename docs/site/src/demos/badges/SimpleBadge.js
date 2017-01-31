// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Badge from 'material-ui/Badge';
import customPropTypes from 'material-ui/utils/customPropTypes';
import IconButton from 'material-ui/IconButton';
import NotificationIcon from 'material-ui/svg-icons/notification';

const styleSheet = createStyleSheet('SimpleBadge', () => ({
  badge: {
    top: 12,
    right: 12,
  },
}));

export default function SimpleBadge(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.row}>
      <Badge badgeContent={4} primary>
        <NotificationIcon />
      </Badge>
      <Badge
        accent
        badgeClassName={classes.badge}
        badgeContent={10}
      >
        <IconButton>
          <NotificationIcon />
        </IconButton>
      </Badge>
    </div>
  );
}

SimpleBadge.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
