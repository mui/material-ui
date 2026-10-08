import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Unstable_Menu2';
import MenuItem from '@mui/material/Unstable_Menu2Item';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';
import MenuSubmenu from '@mui/material/Unstable_Menu2Submenu';
import MenuSubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';

export default function DenseMenu2() {
  return (
    <Menu trigger={<Button>Options</Button>} slotProps={{ list: { dense: true } }}>
      <MenuItem>Single</MenuItem>
      <MenuItem>1.15</MenuItem>
      <MenuItem>Double</MenuItem>
      <MenuSeparator />
      <MenuItem>Custom: 1.2</MenuItem>
      <MenuSubmenu
        trigger={<MenuSubmenuTrigger>Paragraph spacing</MenuSubmenuTrigger>}
      >
        <MenuItem>Add space before paragraph</MenuItem>
        <MenuItem>Add space after paragraph</MenuItem>
      </MenuSubmenu>
    </Menu>
  );
}
