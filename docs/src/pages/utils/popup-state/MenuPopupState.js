import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState from '@material-ui/core/PopupState';

const MenuPopupState = () => (
  <PopupState variant="menu" popupId="demoMenu">
    {({ close, bindTrigger, bindPopup }) => (
      <React.Fragment>
        <Button variant="contained" {...bindTrigger}>
          Open Menu
        </Button>
        <Menu {...bindPopup}>
          <MenuItem onClick={close}>Cake</MenuItem>
          <MenuItem onClick={close}>Death</MenuItem>
        </Menu>
      </React.Fragment>
    )}
  </PopupState>
);

export default MenuPopupState;
