import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Unstable_Menu2';
import MenuItem from '@mui/material/Unstable_Menu2Item';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';
import MenuSubmenu from '@mui/material/Unstable_Menu2Submenu';
import MenuSubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';

export default function SubmenuMenu2() {
  return (
    <Menu trigger={<Button>File</Button>}>
      <MenuItem>New file</MenuItem>
      <MenuItem>Open recent</MenuItem>
      <MenuSeparator />
      <MenuSubmenu trigger={<MenuSubmenuTrigger>Share</MenuSubmenuTrigger>}>
        <MenuItem>Invite people</MenuItem>
        <MenuItem>Copy link</MenuItem>
        <MenuSubmenu trigger={<MenuSubmenuTrigger>Export as</MenuSubmenuTrigger>}>
          <MenuItem>PDF document</MenuItem>
          <MenuItem>EPUB publication</MenuItem>
          <MenuItem>Markdown</MenuItem>
        </MenuSubmenu>
      </MenuSubmenu>
      <MenuSeparator />
      <MenuItem>Print</MenuItem>
    </Menu>
  );
}
