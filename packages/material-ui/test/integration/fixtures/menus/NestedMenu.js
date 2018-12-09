import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class NestedMenu extends React.Component {
  state = {
    firstMenuOpen: false,
    secondMenuOpen: false,
  };

  handleMenuItemClick = () => {
    this.setState({ firstMenuOpen: false, secondMenuOpen: true });
  };

  handleMenuItemClick2 = () => {
    this.setState({ secondMenuOpen: false });
  };

  handleClose = () => {
    this.setState({ firstMenuOpen: false, secondMenuOpen: false });
  };

  render() {
    const { firstMenuOpen, secondMenuOpen } = this.state;

    return (
      <div>
        <Menu
          id="second-menu"
          open={secondMenuOpen}
          onClose={this.handleClose}
          transitionDuration={0}
        >
          <MenuItem onClick={this.handleMenuItemClick2}>Second Menu</MenuItem>
        </Menu>
        <Menu
          id="first-menu"
          open={firstMenuOpen}
          onClose={this.handleClose}
          transitionDuration={0}
        >
          <MenuItem onClick={this.handleMenuItemClick}>Profile 1</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default NestedMenu;
