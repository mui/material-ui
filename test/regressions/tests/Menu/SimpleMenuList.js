// @flow

import React from 'react';
import Paper from 'material-ui/Paper';
import { MenuList, MenuItem } from 'material-ui/Menu';

export default function SimpleMenuList() {
  return (
    <Paper elevation={8}>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem selected>My Account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Paper>
  );
}
