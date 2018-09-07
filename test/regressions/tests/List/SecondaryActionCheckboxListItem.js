import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
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
        <ListItem button selected>
          <ListItemText primary="Primary" />
          <ListItemSecondaryAction>
            <Checkbox />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}
