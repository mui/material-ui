import * as React from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';

export default function HoverMenu2() {
  return (
    <Menu2
      openOnHover
      closeDelay={150}
      trigger={<Button endIcon={<KeyboardArrowDownIcon />}>Products</Button>}
    >
      <Menu2Item>Material UI</Menu2Item>
      <Menu2Item>Base UI</Menu2Item>
      <Menu2Item>MUI X</Menu2Item>
    </Menu2>
  );
}
