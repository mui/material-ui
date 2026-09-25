import * as React from 'react';
import Button from '@mui/material/Button';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';

export default function SubmenuMenu2() {
  return (
    <Menu2 trigger={<Button>File</Button>}>
      <Menu2Item>New file</Menu2Item>
      <Menu2Item>Open recent</Menu2Item>
      <Menu2Separator />
      <Menu2Submenu trigger={<Menu2SubmenuTrigger>Share</Menu2SubmenuTrigger>}>
        <Menu2Item>Invite people</Menu2Item>
        <Menu2Item>Copy link</Menu2Item>
        <Menu2Submenu trigger={<Menu2SubmenuTrigger>Export as</Menu2SubmenuTrigger>}>
          <Menu2Item>PDF document</Menu2Item>
          <Menu2Item>EPUB publication</Menu2Item>
          <Menu2Item>Markdown</Menu2Item>
        </Menu2Submenu>
      </Menu2Submenu>
      <Menu2Separator />
      <Menu2Item>Print</Menu2Item>
    </Menu2>
  );
}
