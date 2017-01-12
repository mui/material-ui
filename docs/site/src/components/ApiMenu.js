import React, { Component, PropTypes } from 'react'
import IconButton from 'material-ui/IconButton';
import { Menu, MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui/svg-icons/more-vert';
import { camelCase } from 'docs/site/src/utils/helpers';
import { apiMenuData } from './api-menu-data.js';

export default class ApiMenu extends Component {
  static propTypes = {
    component: PropTypes.string.isRequired,
  };

  state = {
    anchorEl: undefined,
    open: false,
  };

  handleMenuClick = (event) => this.setState({ open: true, anchorEl: event.currentTarget });

  handleMenuItemClick = (event) => {
    this.setState({ open: false});
    window.location = '/#/component-api/' + event.currentTarget.id
  };

  handleMenuRequestClose = () => this.setState({ open: false });


  render() {
    const { component, className } = this.props;

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
          {apiMenuData[component].map((menuItem) => (
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
    )
  }
}
