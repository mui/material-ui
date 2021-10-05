import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SubMenu from '@mui/material/SubMenu';
import useTheme from '@mui/styles/useTheme';

export default function CascadingMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="cascading-menu"
        aria-haspopup="true"
        onClick={handleButtonClick}
      >
        Open Menu
      </Button>
      <Menu
        id="cascading-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: theme.direction === 'rtl' ? 'left' : 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          subMenu={
            <SubMenu>
              <MenuItem onClick={handleClose}>View</MenuItem>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem onClick={handleClose}>75%</MenuItem>
                    <MenuItem onClick={handleClose}>100%</MenuItem>
                    <MenuItem onClick={handleClose}>125%</MenuItem>
                  </SubMenu>
                }
              >
                Zoom
              </MenuItem>
              <MenuItem onClick={handleClose}>Help</MenuItem>
            </SubMenu>
          }
        >
          Options
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
