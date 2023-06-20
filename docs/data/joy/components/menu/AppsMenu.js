import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Apps from '@mui/icons-material/Apps';

export default function AppsMenu() {
  const buttonRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <IconButton
        ref={buttonRef}
        id="apps-menu-demo"
        aria-label="Applications"
        aria-controls={'apps-menu'}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="plain"
        color="neutral"
        onClick={() => {
          setOpen(!open);
        }}
        sx={{ borderRadius: 40 }}
      >
        <Apps />
      </IconButton>
      <Menu
        id="apps-menu"
        variant="solid"
        invertedColors
        anchorEl={buttonRef.current}
        open={open}
        onClose={handleClose}
        aria-labelledby="apps-menu-demo"
        sx={{
          '--List-padding': '0.5rem',
          '--ListItemDecorator-size': '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gridAutoRows: '100px',
          gap: 1,
        }}
      >
        <MenuItem orientation="vertical" onClick={handleClose}>
          <ListItemDecorator>
            <Avatar>S</Avatar>
          </ListItemDecorator>
          Search
        </MenuItem>
        <MenuItem orientation="vertical" onClick={handleClose}>
          <ListItemDecorator>
            <Avatar>M</Avatar>
          </ListItemDecorator>
          Maps
        </MenuItem>
        <MenuItem orientation="vertical" onClick={handleClose}>
          <ListItemDecorator>
            <Avatar>M</Avatar>
          </ListItemDecorator>
          Mail
        </MenuItem>
        <MenuItem orientation="vertical" onClick={handleClose}>
          <ListItemDecorator>
            <Avatar>D</Avatar>
          </ListItemDecorator>
          Drive
        </MenuItem>
        <MenuItem orientation="vertical" onClick={handleClose}>
          <ListItemDecorator>
            <Avatar>C</Avatar>
          </ListItemDecorator>
          Calendar
        </MenuItem>
      </Menu>
    </Box>
  );
}
