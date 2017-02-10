// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';

const styleSheet = createStyleSheet('Drawers', () => ({
  inner: {
    width: '200px',
  },
}));

export default class UndockedDrawer extends Component {
  state = {
    open: false,
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div>
        <Button onClick={this.handleOpen}>Open Drawer</Button>
        <Drawer open={this.state.open} anchor={this.state.anchor} onRequestClose={this.handleClose}>
          <div className={classes.inner}>
            <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
            <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
          </div>
        </Drawer>
      </div>
    );
  }
}

UndockedDrawer.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
