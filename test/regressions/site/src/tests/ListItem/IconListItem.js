// @flow weak

import React from 'react';
import Icon from 'material-ui/Icon';
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
          <Icon>phone</Icon>
        </ListItemIcon>
        <ListItemText primary="Icon dense with button" secondary="Work phone" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Icon>inbox</Icon>
        </ListItemIcon>
        <ListItemText primary="Icon" />
      </ListItem>
      <ListItem>
        <ListItemText inset primary="Inset" />
      </ListItem>
    </div>
  );
}
