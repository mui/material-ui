import * as React from 'react';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';

export default function FadeMenu2() {
  return (
    <Menu2 trigger={<Button>Dashboard</Button>} slots={{ transition: Fade }}>
      <Menu2Item>Profile</Menu2Item>
      <Menu2Item>My account</Menu2Item>
      <Menu2Item>Logout</Menu2Item>
    </Menu2>
  );
}
