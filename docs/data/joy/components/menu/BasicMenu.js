import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';

export default function BasicMenu() {
  return (
    <div>
      <Menu
        button={
          <Button variant="outlined" color="neutral">
            Dashboard
          </Button>
        }
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </div>
  );
}
