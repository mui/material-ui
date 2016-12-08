// @flow weak

import React from 'react';
import {
  ListItem,
  ListItemText,
} from 'material-ui/List';

export default function IconListItem() {
  return (
    <div style={{ background: '#fff', width: 300 }}>
      <ListItem>
        <span className="material-icons">inbox</span>
        <ListItemText primary="Icon" />
      </ListItem>
    </div>
  );
}
