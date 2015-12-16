import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

const menuItems = [
  {payload: '1', text: 'All Broadcasts'},
  {payload: '2', text: 'All Voice'},
  {payload: '3', text: 'All Text'},
  {payload: '4', text: 'Complete Voice'},
  {payload: '5', text: 'Complete Text'},
  {payload: '6', text: 'Active Voice'},
  {payload: '7', text: 'Active Text'},
];

const ToolbarsExamplesSimple = React.createClass({
  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} float="left">
          <DropDownMenu menuItems={menuItems} />
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <ToolbarTitle text="Options" />
          <FontIcon className="muidocs-icon-custom-sort" />
          <IconMenu iconButtonElement={
            <IconButton touch={true}>
              <NavigationExpandMoreIcon />
            </IconButton>
          }>
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="More Info" />
          </IconMenu>
          <ToolbarSeparator />
          <RaisedButton label="Create Broadcast" primary={true} />
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default ToolbarsExamplesSimple;
