import React, { useEffect } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const ContextMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mouseX, setMouseX] = React.useState(null);
  const [mouseY, setMouseY] = React.useState(null);

  const handleClick = event => {
    event.preventDefault();
    setMouseY(event.clientY - 4);
    setMouseX(event.clientX + 2);
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {}, [mouseX, mouseY]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="context-wrapper"
      aria-controls="simple-menu"
      aria-haspopup="true"
      onContextMenu={handleClick}
    >
      <Button>Right Click To Open Menu</Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: mouseY, left: mouseX }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ContextMenu;
