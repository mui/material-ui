import React from 'react';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';

const style = {
  marginRight: 32,
  marginBottom: 32,
  float: 'left',
  position: 'relative',
  zIndex: 0,
};

const MenuExampleDisable = () => (
  <div>
    <Menu style={style} desktop={true}>
      <MenuItem primaryText="Back" />
      <MenuItem primaryText="Forward" disabled={true} />
      <Divider />
      <MenuItem primaryText="Recently closed" disabled={true} />
      <MenuItem primaryText="Google" disabled={true} />
      <MenuItem primaryText="YouTube" />
    </Menu>
    <Menu style={style} desktop={true}>
      <MenuItem primaryText="Undo" />
      <MenuItem primaryText="Redo" disabled={true} />
      <Divider />
      <MenuItem primaryText="Cut" disabled={true} />
      <MenuItem primaryText="Copy" disabled={true} />
      <MenuItem primaryText="Paste" />
    </Menu>
  </div>
);

export default MenuExampleDisable;
