import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Check from '@mui/icons-material/Check';

export default function SizeMenu() {
  const buttonRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        ref={buttonRef}
        id="size-demo-button"
        aria-controls={'size-demo-menu'}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="neutral"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Format
      </Button>
      <Menu
        id="size-demo-menu"
        size="sm"
        anchorEl={buttonRef.current}
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
