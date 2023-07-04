import * as React from 'react';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

export default function BasicMenu() {
  return (
    <Dropdown>
      <MenuButton id="basic-demo-button" variant="outlined" color="neutral">
        Dashboard...
      </MenuButton>
      <Menu id="basic-menu">
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Dropdown>
  );
}
