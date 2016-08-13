// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import Avatar from 'material-ui/Avatar';

const styleSheet = createStyleSheet('ImageAvatars', () => ({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function ImageAvatars(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <div className={classes.row}>
        <Avatar
          alt="Remy Sharp"
          src="https://s3.amazonaws.com/uifaces/faces/twitter/rem/73.jpg"
          className={classes.avatar}
        />
        <Avatar
          alt="Adelle Charles"
          src="https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
          className={classes.avatar}
        />
      </div>
      <div className={classes.row}>
        <Avatar
          alt="Jono Hunt"
          src="https://s3.amazonaws.com/uifaces/faces/twitter/jonohunt/128.jpg"
          className={classes.bigAvatar}
        />
      </div>
    </div>
  );
}

ImageAvatars.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
