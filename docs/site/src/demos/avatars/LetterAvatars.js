// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Avatar from 'material-ui/Avatar';
import { deepOrange, deepPurple } from 'material-ui/styles/colors';

const styleSheet = createStyleSheet('LetterAvatars', () => ({
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function LetterAvatars(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.row}>
      <Avatar
        icon="H"
        className={classes.avatar}
      />
      <Avatar
        icon="N"
        className={classes.orangeAvatar}
      />
      <Avatar
        icon="O"
        className={classes.purpleAvatar}
      />
    </div>
  );
}

LetterAvatars.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
