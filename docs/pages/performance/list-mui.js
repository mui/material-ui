import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import InboxIcon from '@material-ui/icons/Inbox';
import CommentIcon from '@material-ui/icons/Comment';

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
          <ListItemSecondaryAction>
            <CommentIcon />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default TableMui;
