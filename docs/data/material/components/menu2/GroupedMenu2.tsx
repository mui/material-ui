import * as React from 'react';
import Button from '@mui/material/Button';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';

export default function GroupedMenu2() {
  return (
    <Menu2 trigger={<Button>Insert</Button>}>
      <Menu2Group>
        <Menu2GroupLabel>Media</Menu2GroupLabel>
        <Menu2Item>Image</Menu2Item>
        <Menu2Item>Video</Menu2Item>
        <Menu2Item>Audio</Menu2Item>
      </Menu2Group>
      <Menu2Separator />
      <Menu2Group>
        <Menu2GroupLabel>Layout</Menu2GroupLabel>
        <Menu2Item>Table</Menu2Item>
        <Menu2Item>Column break</Menu2Item>
        <Menu2Item>Page break</Menu2Item>
      </Menu2Group>
    </Menu2>
  );
}
