import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Apps from '@mui/icons-material/Apps';

export default function SelectedMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(1);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const createHandleClose = (index: number) => () => {
    setAnchorEl(null);
    if (typeof index === 'number') {
      setSelectedIndex(index);
    }
  };

  return (
    <div>
      <Button
        id="selected-demo-button"
        aria-controls={open ? 'selected-demo-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="neutral"
        onClick={handleClick}
        startDecorator={<Apps />}
      >
        Apps
      </Button>
      <Menu
        id="selected-demo-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={createHandleClose(-1)}
        aria-labelledby="selected-demo-button"
      >
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
    </div>
  );
}
