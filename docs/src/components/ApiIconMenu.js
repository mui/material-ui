// @flow weak

import React, { PureComponent, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import { Menu, MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { camelCase } from 'docs/src/utils/helpers';

export default class ApiIconMenu extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    menuItems: PropTypes.array.isRequired,
    selectedItem: PropTypes.string,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  state = {
    anchorEl: undefined,
    open: false,
  };

  handleMenuClick = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleMenuItemClick = (event) => {
    this.setState({ open: false });
    this.context.router.push(`/component-api/${event.currentTarget.id}`);
  };

  handleMenuRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { className, menuItems, selectedItem } = this.props;

    return (
      <div>
        <IconButton
          contrast
          onClick={this.handleMenuClick}
          aria-owns="api-menu"
          aria-haspopup="true"
          className={className}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="api-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleMenuRequestClose}
        >
          {menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem}
              id={menuItem}
              onClick={this.handleMenuItemClick}
              selected={menuItem === selectedItem}
            >
              {camelCase(menuItem)}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}
