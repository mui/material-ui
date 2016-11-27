// @flow weak

import React from 'react';
import Avatar from 'material-ui/Avatar';
import image from './ImageAvatar.jpg';

export default function ImageAvatar() {
  return (
    <Avatar
      alt="Remy Sharp"
      src={image}
    />
  );
}
