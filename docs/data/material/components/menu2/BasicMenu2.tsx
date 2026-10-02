import * as React from 'react';
import Button from '@mui/material/Button';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';

export default function BasicMenu2() {
  return (
    <Menu2 trigger={<Button>Dashboard</Button>}>
      <Menu2Item>Profile</Menu2Item>
      <Menu2Item>My account</Menu2Item>
      <Menu2Item>Logout</Menu2Item>
    </Menu2>
  );
}
