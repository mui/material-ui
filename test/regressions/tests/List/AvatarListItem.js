// @flow

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function AvatarListItem() {
  return (
    <div style={{ backgroundColor: '#fff', width: 300 }}>
      <ListItem>
        <Avatar>
          <Icon>folder</Icon>
        </Avatar>
        <ListItemText primary="Avatar" />
      </ListItem>
      <ListItem>
        <Avatar>
          <Icon>folder</Icon>
        </Avatar>
        <ListItemText primary="Avatar" secondary="Secondary" />
      </ListItem>
      <List dense>
        <ListItem>
          <Avatar>
            <Icon>folder</Icon>
          </Avatar>
          <ListItemText primary="Avatar" />
        </ListItem>
        <ListItem>
          <Avatar>
            <Icon>folder</Icon>
          </Avatar>
          <ListItemText primary="Avatar" secondary="Secondary" />
        </ListItem>
      </List>
    </div>
  );
}
