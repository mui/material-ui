import React from 'react';
import AppBar from 'material-ui/lib/AppBar';
import IconButton from 'material-ui/lib/IconButton';
import IconMenu from 'material-ui/lib/IconMenu';
import MenuItem from 'material-ui/lib/MenuItem';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';

const AppBarExampleIconMenu = () => (
  <AppBar
    title="Title"
    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    }
  />
);

export default AppBarExampleIconMenu;
