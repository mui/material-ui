// @flow

import * as React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export default function SecondaryActionCheckboxListItem() {
  return (
    <div style={{ background: '#fff', width: 300 }}>
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
    </div>
  );
}
