import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

const MenuExampleDisable = () => (
  <div>
    <Paper style={style}>
      <Menu desktop={true}>
        <MenuItem primaryText="Back" />
        <MenuItem primaryText="Forward" disabled={true} />
        <Divider />
        <MenuItem primaryText="Recently closed" disabled={true} />
        <MenuItem primaryText="Google" disabled={true} />
        <MenuItem primaryText="YouTube" />
      </Menu>
    </Paper>
    <Paper style={style}>
      <Menu desktop={true}>
        <MenuItem primaryText="Undo" />
        <MenuItem primaryText="Redo" disabled={true} />
        <Divider />
        <MenuItem primaryText="Cut" disabled={true} />
        <MenuItem primaryText="Copy" disabled={true} />
        <MenuItem primaryText="Paste" />
      </Menu>
    </Paper>
  </div>
);

export default MenuExampleDisable;
