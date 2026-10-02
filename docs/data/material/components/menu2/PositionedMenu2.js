import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';

export default function PositionedMenu2() {
  return (
    <Stack direction="row" spacing={2}>
      <Menu2
        trigger={<Button>Above, end aligned</Button>}
        side="top"
        align="end"
        sideOffset={8}
      >
        <Menu2Item>Profile</Menu2Item>
        <Menu2Item>My account</Menu2Item>
        <Menu2Item>Logout</Menu2Item>
      </Menu2>
      <Menu2
        trigger={<Button>Beside</Button>}
        side="inline-end"
        align="start"
        sideOffset={8}
      >
        <Menu2Item>Profile</Menu2Item>
        <Menu2Item>My account</Menu2Item>
        <Menu2Item>Logout</Menu2Item>
      </Menu2>
    </Stack>
  );
}
