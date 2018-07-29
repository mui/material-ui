import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuState from '@material-ui/core/MenuState';

const SimpleMenuState = () => (
  <MenuState menuId="menu">
    {({ close, bindTrigger, bindMenu }) => (
      <React.Fragment>
        <Button {...bindTrigger}>Open Menu</Button>
        <Menu {...bindMenu}>
          <MenuItem onClick={close}>Cake</MenuItem>
          <MenuItem onClick={close}>Death</MenuItem>
        </Menu>
      </React.Fragment>
    )}
  </MenuState>
);

export default SimpleMenuState;
