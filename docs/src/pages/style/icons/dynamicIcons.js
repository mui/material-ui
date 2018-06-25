import React from 'react';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom'
import {MenuList, MenuItem} from '@material-ui/core/';
import {ListItemText, ListItemIcon} from '@material-ui/core/';
import * as Icons from '@material-ui/icons/'

const menu = [
  { name: 'Notifications', icon: 'Notifications' },
  { name: 'Create Notification', icon: 'AddAlert' },
]

class Menu extends React.Component {
    render() {
        return (
            <Paper>
      <MenuList>
        {menu.map((item, index) => (
            <MenuItem>
              <ListItemIcon >
                {React.createElement(Icons[item.icon])}
              </ListItemIcon>
              <ListItemText inset primary={item.name} />
            </MenuItem>
        ))}
      </MenuList>
    </Paper>
        )
    }
}

export default Menu;
