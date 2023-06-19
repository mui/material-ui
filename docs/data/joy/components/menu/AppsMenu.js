import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Apps from '@mui/icons-material/Apps';

export default function AppsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <IconButton
        id="apps-menu-demo"
        aria-label="Applications"
        aria-controls={open ? 'apps-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="plain"
        color="neutral"
        onClick={handleClick}
        sx={{ borderRadius: 40 }}
      >
        <Apps />
      </IconButton>
      <Menu
        id="apps-menu"
        variant="solid"
        invertedColors
        anchorEl={anchorEl}
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
