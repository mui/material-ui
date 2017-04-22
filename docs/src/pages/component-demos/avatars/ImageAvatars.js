// @flow weak

import React from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Avatar from 'material-ui/Avatar';
import remyImage from 'docs/src/assets/images/remy.jpg';
import uxecoImage from 'docs/src/assets/images/uxceo-128.jpg';

const styleSheet = createStyleSheet('ImageAvatars', () => ({
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
}));

export default function ImageAvatars(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.row}>
      <Avatar
        alt="Remy Sharp"
        src={remyImage}
        className={classes.avatar}
      />
      <Avatar
        alt="Adelle Charles"
        src={uxecoImage}
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}

ImageAvatars.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
