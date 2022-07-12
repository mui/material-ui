import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Check from '@mui/icons-material/Check';

export default function SizeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="neutral"
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        componentsProps={{
          listbox: {
            'aria-labelledby': 'basic-button',
            size: 'sm',
          },
        }}
      >
        <MenuItem>
          <ListItemDecorator /> Single
        </MenuItem>
        <MenuItem>
          <ListItemDecorator />
          1.15
        </MenuItem>
        <MenuItem>
          <ListItemDecorator />
          Double
        </MenuItem>
        <MenuItem>
          <ListItemDecorator>
            <Check />
          </ListItemDecorator>
          Custom: 1.2
        </MenuItem>
        <ListDivider />
        <MenuItem>Add space before paragraph</MenuItem>
        <MenuItem>Add space after paragraph</MenuItem>
        <ListDivider />
        <MenuItem>Custom spacing...</MenuItem>
      </Menu>
    </div>
  );
}
