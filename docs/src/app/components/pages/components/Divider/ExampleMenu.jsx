import React from 'react';
import Divider from 'material-ui/lib/Divider';
import {Menu, MenuItem} from 'material-ui/lib/Menu';

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
