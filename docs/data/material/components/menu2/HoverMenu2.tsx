import * as React from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Unstable_Menu2';
import MenuItem from '@mui/material/Unstable_Menu2Item';

export default function HoverMenu2() {
  return (
    <Menu
      openOnHover
      closeDelay={150}
      trigger={<Button endIcon={<KeyboardArrowDownIcon />}>Products</Button>}
    >
      <MenuItem>Material UI</MenuItem>
      <MenuItem>Base UI</MenuItem>
      <MenuItem>MUI X</MenuItem>
    </Menu>
  );
}
