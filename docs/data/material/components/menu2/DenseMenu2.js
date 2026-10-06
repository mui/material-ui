import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Unstable_Menu2';
import MenuItem from '@mui/material/Unstable_Menu2Item';
import MenuSeparator from '@mui/material/Unstable_Menu2Separator';

export default function DenseMenu2() {
  return (
    <Menu trigger={<Button>Options</Button>} slotProps={{ list: { dense: true } }}>
      <MenuItem>Single</MenuItem>
      <MenuItem>1.15</MenuItem>
      <MenuItem>Double</MenuItem>
      <MenuSeparator />
      <MenuItem>Custom: 1.2</MenuItem>
      <MenuItem>Add space before paragraph</MenuItem>
    </Menu>
  );
}
