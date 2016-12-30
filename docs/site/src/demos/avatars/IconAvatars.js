// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Avatar from 'material-ui/Avatar';
import { pink, green } from 'material-ui/styles/colors';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import PageviewIcon from 'material-ui/svg-icons/action/pageview';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';

const styleSheet = createStyleSheet('IconAvatars', () => ({
  avatar: {
    margin: 10,
  },
  pinkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: pink[500],
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function IconAvatars(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.row}>
      <Avatar
        icon={<FolderIcon />}
        className={classes.avatar}
      />
      <Avatar
        icon={<PageviewIcon />}
        className={classes.pinkAvatar}
      />
      <Avatar
        icon={<AssignmentIcon />}
        className={classes.greenAvatar}
      />
    </div>
  );
}

IconAvatars.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
