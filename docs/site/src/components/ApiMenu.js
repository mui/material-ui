// @flow weak

import React, { PureComponent, PropTypes } from 'react';
import { camelCase } from 'docs/site/src/utils/helpers';
import IconButton from 'material-ui/IconButton';
import { Menu, MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui/svg-icons/more-vert';


export default class ApiMenu extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    menuItems: PropTypes.array.isRequired,
  };

  state = {
    anchorEl: undefined,
    open: false,
  };

  handleMenuClick = (event) => this.setState({
    open: true,
    anchorEl: event.currentTarget,
  });

  handleMenuItemClick = (event) => {
    this.setState({ open: false });
    window.location = `/#/component-api/${event.currentTarget.id}`;
  };

  handleMenuRequestClose = () => this.setState({
    open: false,
  });

  render() {
    const { menuItems, className } = this.props;

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
            >
              {camelCase(menuItem)}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}
