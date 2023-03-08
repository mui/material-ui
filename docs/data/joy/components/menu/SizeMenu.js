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
        id="size-demo-button"
        aria-controls={open ? 'size-demo-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="neutral"
        onClick={handleClick}
      >
        Format
      </Button>
      <Menu
        id="size-demo-menu"
        size="sm"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="size-demo-button"
      >
        <MenuItem onClick={handleClose}>
          <ListItemDecorator /> Single
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemDecorator />
          1.15
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemDecorator />
          Double
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemDecorator>
            <Check />
          </ListItemDecorator>
          Custom: 1.2
        </MenuItem>
        <ListDivider />
        <MenuItem onClick={handleClose}>Add space before paragraph</MenuItem>
        <MenuItem onClick={handleClose}>Add space after paragraph</MenuItem>
        <ListDivider />
        <MenuItem onClick={handleClose}>Custom spacing...</MenuItem>
      </Menu>
    </div>
  );
}
