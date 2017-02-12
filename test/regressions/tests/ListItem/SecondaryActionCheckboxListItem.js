// @flow weak

import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export default function SecondaryActionCheckboxListItem() {
  return (
    <div style={{ background: '#fff', width: 300 }}>
      <ListItem button dense>
        <ListItemText primary="Primary" />
        <ListItemSecondaryAction>
          <Checkbox />
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}
