// @flow weak

import React from 'react';
import Avatar from 'material-ui/Avatar';
import { deepOrange } from 'material-ui/styles/colors';

export default function ImageAvatar() {
  return (
    <Avatar
      icon="N"
      style={{ color: '#fff', backgroundColor: deepOrange[500] }}
    />
  );
}
