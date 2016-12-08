// @flow weak

import React from 'react';
import Avatar from 'material-ui/Avatar';
import {
  ListItem,
  ListItemText,
} from 'material-ui/List';

export default function AvatarListItem() {
  return (
    <div style={{ background: '#fff', width: 300 }}>
      <ListItem>
        <Avatar icon={<span className="material-icons">folder</span>} />
        <ListItemText primary="Avatar" />
      </ListItem>
    </div>
  );
}
