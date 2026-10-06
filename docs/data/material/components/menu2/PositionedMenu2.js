import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Unstable_Menu2';
import MenuItem from '@mui/material/Unstable_Menu2Item';

export default function PositionedMenu2() {
  return (
    <Stack direction="row" spacing={2}>
      <Menu
        trigger={<Button>Above, end aligned</Button>}
        side="top"
        align="end"
        sideOffset={8}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
      <Menu
        trigger={<Button>Beside</Button>}
        side="inline-end"
        align="start"
        sideOffset={8}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Stack>
  );
}
