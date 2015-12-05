import React from 'react';
import AppBar from 'material-ui/app-bar';
import IconButton from 'material-ui/icon-button';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconMenu from 'material-ui/menus/icon-menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/menus/menu-item';

const AppBarExampleIconMenu = () => {
  return (
    <AppBar
      title="Title"
      iconElementLeft={<IconButton><NavigationClose /></IconButton>}
      iconElementRight={
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal:'right', vertical:'top'}}
          anchorOrigin={{horizontal:'right', vertical:'top'}}
        >
          <MenuItem primaryText="Refresh" />
          <MenuItem primaryText="Help" />
          <MenuItem primaryText="Sign out" />
        </IconMenu>
      }
    />
  );
};

export default AppBarExampleIconMenu;
