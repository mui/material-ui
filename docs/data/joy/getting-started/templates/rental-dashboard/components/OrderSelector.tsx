import * as React from 'react';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Dropdown from '@mui/joy/Dropdown';

export default function OrderSelector() {
  const SIZES = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large'];
  const [size, setSize] = React.useState('Medium');

  return (
    <Dropdown>
      <MenuButton
        variant="plain"
        color="primary"
        endDecorator={<ArrowDropDown />}
        sx={{ flexWrap: 'nowrap' }}
      >
        Order by
      </MenuButton>
      <Menu sx={{ pr: 4 }}>
        <MenuItem
          onClick={() => {
            const nextIndex = SIZES.indexOf(size) - 1;
            const value = nextIndex < 0 ? SIZES[SIZES.length - 1] : SIZES[nextIndex];
            setSize(value);
          }}
        >
          Price
        </MenuItem>
        <MenuItem
          onClick={() => {
            const nextIndex = SIZES.indexOf(size) + 1;
            const value = nextIndex > SIZES.length - 1 ? SIZES[0] : SIZES[nextIndex];
            setSize(value);
          }}
        >
          Date
        </MenuItem>
        <MenuItem
          onClick={() => {
            const nextIndex = SIZES.indexOf(size) + 1;
            const value = nextIndex > SIZES.length - 1 ? SIZES[0] : SIZES[nextIndex];
            setSize(value);
          }}
        >
          Rating
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
