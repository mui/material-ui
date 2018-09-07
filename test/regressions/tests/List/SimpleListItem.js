import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function SimpleListItem() {
  return (
    <div style={{ backgroundColor: '#fff', width: 300 }}>
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
      <ListItem selected>
        <ListItemText primary="Primary" />
      </ListItem>
    </div>
  );
}
