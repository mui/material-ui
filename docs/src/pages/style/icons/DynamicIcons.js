import React from 'react';
import Paper from '@material-ui/core/Paper';
import { MenuList, MenuItem, ListItemText, ListItemIcon } from '@material-ui/core/';
import * as Icons from '@material-ui/icons/';

const menu = [
  { name: 'Notifications', icon: 'Notifications' },
  { name: 'Create Notification', icon: 'AddAlert' },
];

function Menu(props) {
  return (
    <Paper>
      <MenuList>
        {menu.map((item, index) => (
          <MenuItem key={index}>
            <ListItemIcon >
              {React.createElement(Icons[item.icon])}
            </ListItemIcon>
            <ListItemText inset primary={item.name}/>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  )
};
export default Menu;
