// @flow weak

import React from 'react';
import Avatar from 'material-ui/Avatar';
import { deepOrange } from 'material-ui/styles/colors';

export default function IconAvatar() {
  return (
    <Avatar
      style={{
        color: '#fff',
        backgroundColor: deepOrange[500],
      }}
    >
      <span className="material-icons">favorite</span>
    </Avatar>
  );
}
