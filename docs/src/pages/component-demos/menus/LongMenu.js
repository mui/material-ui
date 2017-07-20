// @flow weak

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

class LongMenu extends Component {
  state = {
    anchorEl: undefined,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button aria-owns="long-menu" aria-haspopup="true" onClick={this.handleClick}>
          Open Long Menu
        </Button>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          onClick={this.handleRequestClose}
          style={{ maxHeight: ITEM_HEIGHT * 4.5 }}
          MenuListProps={{
            style: {
              width: 200,
            },
          }}
        >
          {options.map(option =>
            <MenuItem key={option} selected={option === 'Pyxis'}>
              {option}
            </MenuItem>,
          )}
        </Menu>
      </div>
    );
  }
}

export default LongMenu;
