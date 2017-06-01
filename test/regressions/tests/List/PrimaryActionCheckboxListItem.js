// @flow

import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';

export default function PrimaryActionCheckboxListItem() {
  return (
    <div style={{ background: '#fff', width: 300 }}>
      <ListItem button>
        <Checkbox tabIndex="-1" ripple={false} />
        <ListItemText primary="Primary" />
        <ListItemSecondaryAction>
          <IconButton>comment</IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button dense>
        <Checkbox tabIndex="-1" ripple={false} />
        <ListItemText primary="Primary" />
        <ListItemSecondaryAction>
          <IconButton>comment</IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}
