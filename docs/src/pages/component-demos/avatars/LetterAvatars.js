// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
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

function LetterAvatars(props) {
  const classes = props.classes;
  return (
    <div className={classes.row}>
      <Avatar className={classes.avatar}>H</Avatar>
      <Avatar className={classes.orangeAvatar}>N</Avatar>
      <Avatar className={classes.purpleAvatar}>OP</Avatar>
    </div>
  );
}

LetterAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(LetterAvatars);
