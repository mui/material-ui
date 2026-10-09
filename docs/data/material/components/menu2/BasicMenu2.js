import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Unstable_Menu2';
import MenuItem from '@mui/material/Unstable_Menu2Item';

export default function BasicMenu2() {
  return (
    <Menu trigger={<Button>Dashboard</Button>}>
      <MenuItem>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  );
}
