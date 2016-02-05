import React from 'react';
import Divider from 'material-ui/lib/divider';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

const style = {
  // Without this, the menu overflows the CodeExample container.
  float: 'left',
};

const DividerExampleMenu = () => (
  <Menu desktop={true} style={style}>
    <MenuItem primaryText="Settings" />
    <MenuItem primaryText="Help & feedback" />
    <Divider />
    <MenuItem primaryText="Sign out" />
  </Menu>
);

export default DividerExampleMenu;
