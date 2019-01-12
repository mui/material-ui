import React from 'react';
import Menu from 'packages/material-ui/src/Menu';
import MenuItem from 'packages/material-ui/src/MenuItem';

const options = ['Menu Item 1', 'Menu Item 2', 'Menu Item 3'];

class SimpleMenu extends React.Component {
  state = {
    open: false,
    selectedIndex: undefined,
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, open: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Menu id="simple-menu" open={this.state.open} onClose={this.handleClose} {...this.props}>
          {options.map((label, index) => (
            <MenuItem
              key={label}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
