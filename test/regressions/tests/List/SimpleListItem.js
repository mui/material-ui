// @flow

import * as React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';

export default function SimpleListItem() {
  return (
    <div style={{ background: '#fff', width: 300 }}>
      <ListItem>
        <ListItemText primary="Primary" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Primary" secondary="Secondary" />
      </ListItem>
      <ListItem dense>
        <ListItemText primary="Primary" />
      </ListItem>
      <ListItem dense>
        <ListItemText primary="Primary" secondary="Secondary" />
      </ListItem>
    </div>
  );
}
