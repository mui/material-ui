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
      <Avatar className={classes.avatar}>H</Avatar>
      <Avatar className={classes.orangeAvatar}>N</Avatar>
      <Avatar className={classes.purpleAvatar}>OP</Avatar>
    </div>
  );
}

LetterAvatars.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
