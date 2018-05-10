// @flow

import React from 'react';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';

export default function SecondaryActionCheckboxListItem() {
  return (
    <div style={{ backgroundColor: '#fff', width: 300 }}>
      <List>
        <ListItem button>
          <ListItemText primary="Primary" />
          <ListItemSecondaryAction>
            <Checkbox />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button dense>
          <ListItemText primary="Primary" />
          <ListItemSecondaryAction>
            <Checkbox />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}
