import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from '@material-ui/core/PopupState';

const MenuPopupState = () => (
  <PopupState popupId="demoMenu">
    {popupState => {
      const { close } = popupState;
      return (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Open Menu
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={close}>Cake</MenuItem>
            <MenuItem onClick={close}>Death</MenuItem>
          </Menu>
        </React.Fragment>
      );
    }}
  </PopupState>
);

export default MenuPopupState;
