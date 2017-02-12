// @flow weak

import React from 'react';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import {
  ListItem,
  ListItemText,
} from 'material-ui/List';

export default function AvatarListItem() {
  return (
    <div style={{ background: '#fff', width: 300 }}>
      <ListItem>
        <Avatar><Icon>folder</Icon></Avatar>
        <ListItemText primary="Avatar" />
      </ListItem>
    </div>
  );
}
