// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { List, ListItem, ListItemText } from 'material-ui/List';
import { Menu, MenuItem } from 'material-ui/Menu';

const styleSheet = createStyleSheet('SimpleListMenu', (theme) => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    background: theme.palette.background.paper,
  },
}));

const options = [
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

export default class SimpleListMenu extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    anchorEl: undefined,
    open: false,
    selectedIndex: 1,
  };

  button = undefined;

  handleClickListItem = (event) => this.setState({ open: true, anchorEl: event.currentTarget });

  handleMenuItemClick = (event, index) => this.setState({ selectedIndex: index, open: false });

  handleRequestClose = () => this.setState({ open: false });

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div className={classes.root}>
        <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="When device is locked"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="When device is locked"
              secondary={options[this.state.selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          className={classes.menu}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {options.map((n, index) => {
            return (
              <MenuItem
                key={index}
                selected={index === this.state.selectedIndex}
                onClick={(event) => this.handleMenuItemClick(event, index)}
              >
                {n}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  }
}

