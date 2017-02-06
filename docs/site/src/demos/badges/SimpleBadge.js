// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Badge from 'material-ui/Badge';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Icon from 'material-ui/Icon';

const styleSheet = createStyleSheet('SimpleBadge', () => ({
  badge: {
    margin: '0 20px',
  }
}));

export default function SimpleBadge(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.row}>
      <Badge 
        badgeContent={4}
        className={classes.badge}
        primary
      >
        <Icon>mail</Icon>
      </Badge>
      <Badge
        accent
        badgeContent={10}
        className={classes.badge}
      >
        <Icon>folder</Icon>
      </Badge>
    </div>
  );
}

SimpleBadge.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
