import * as React from 'react';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Dropdown from '@mui/joy/Dropdown';

export default function OrderSelector() {
  return (
    <Dropdown>
      <MenuButton
        variant="plain"
        color="primary"
        endDecorator={<ArrowDropDown />}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Order by
      </MenuButton>
      <Menu sx={{ minWidth: 120 }}>
        <MenuItem>Price</MenuItem>
        <MenuItem>Date</MenuItem>
        <MenuItem>Rating</MenuItem>
      </Menu>
    </Dropdown>
  );
}
