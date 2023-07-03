import * as React from 'react';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Apps from '@mui/icons-material/Apps';
import Dropdown from '@mui/joy/Dropdown';

export default function SelectedMenu() {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(1);

  const createHandleClose = (index: number) => () => {
    if (typeof index === 'number') {
      setSelectedIndex(index);
    }
  };

  return (
    <Dropdown>
      <MenuButton
        id="selected-demo-button"
        variant="outlined"
        color="neutral"
        startDecorator={<Apps />}
      >
        Apps
      </MenuButton>
      <Menu id="selected-demo-menu">
        <MenuItem
          {...(selectedIndex === 0 && { selected: true, variant: 'soft' })}
          onClick={createHandleClose(0)}
        >
          Random project
        </MenuItem>
        <MenuItem
          {...(selectedIndex === 1 && { selected: true, variant: 'soft' })}
          onClick={createHandleClose(1)}
        >
          Production - web
        </MenuItem>
        <MenuItem
          {...(selectedIndex === 2 && { selected: true, variant: 'soft' })}
          onClick={createHandleClose(2)}
        >
          Staging - web
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
