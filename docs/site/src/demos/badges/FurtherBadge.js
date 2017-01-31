// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Badge from 'material-ui/Badge';
import customPropTypes from 'material-ui/utils/customPropTypes';
import IconButton from 'material-ui/IconButton';
import ImageIcon from 'material-ui/svg-icons/image';
import FaceIcon from 'material-ui/svg-icons/face';

const styleSheet = createStyleSheet('FurtherBadge', () => ({
  badge: {
    fontSize: 20,
    right: 12,
  },
}));

export default function FurtherBadge(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.row}>
      <Badge badgeContent={<IconButton><FaceIcon /></IconButton>}>
        <ImageIcon />
      </Badge>
      <Badge
        badgeContent="&copy;"
        badgeClassName={classes.badge}
      >
        Company Name
      </Badge>
    </div>
  );
}

FurtherBadge.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
