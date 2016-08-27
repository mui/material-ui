// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Avatar from 'material-ui/Avatar';
import { pink, green } from 'material-ui/styles/colors';

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
        icon={<span className="material-icons">folder</span>}
        className={classes.avatar}
      />
      <Avatar
        icon={<span className="material-icons">pageview</span>}
        className={classes.pinkAvatar}
      />
      <Avatar
        icon={<span className="material-icons">assignment</span>}
        className={classes.greenAvatar}
      />
    </div>
  );
}

IconAvatars.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
