// @flow weak

import React from 'react';
import Avatar from 'material-ui/Avatar';
import { deepOrange } from 'material-ui/styles/colors';
import Icon from 'material-ui/Icon';

export default function IconAvatar() {
  return (
    <Avatar
      style={{
        color: '#fff',
        backgroundColor: deepOrange[500],
      }}
    >
      <Icon>favorite</Icon>
    </Avatar>
  );
}
