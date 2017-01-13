// @flow weak

import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
} from 'material-ui/List';

export default function IconListItem() {
  return (
    <div style={{ background: '#fff', width: 300 }}>
      <ListItem dense button>
        <ListItemIcon>
          <span className="material-icons">phone</span>
        </ListItemIcon>
        <ListItemText primary="Icon dense with button" secondary="Work phone" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <span className="material-icons">inbox</span>
        </ListItemIcon>
        <ListItemText primary="Icon" />
      </ListItem>
      <ListItem>
        <ListItemText inset primary="Inset" />
      </ListItem>
    </div>
  );
}
