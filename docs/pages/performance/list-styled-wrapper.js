import React from 'react';
import List from '@material-ui/core/List';
import {ListItemWrapper as ListItem} from '@material-ui/core/ListItem';
import { ListItemTextWrapper as ListItemText } from '@material-ui/core/ListItemText';
import { ListItemIconWrapper as ListItemIcon } from '@material-ui/core/ListItemIcon';
import { ListItemAvatarWrapper as ListItemAvatar } from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import InboxIcon from '@material-ui/icons/Inbox';

const data = { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 };
const rows = Array.from(new Array(1000)).map(() => data);

function TableMui() {
  return (
    <List>
      {rows.map((row, index) => (
        <ListItem key={index}>
          <ListItemAvatar><Avatar>{'D'}</Avatar></ListItemAvatar>
          <ListItemText primary={row.name} />
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );
}

export default TableMui;
