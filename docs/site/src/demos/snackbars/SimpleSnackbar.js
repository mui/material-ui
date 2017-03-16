// @flow weak

import React, { Component } from 'react';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

export default class SimpleSnackbar extends Component {
  state = {
    open: false,
    message: 'Event added to your calendar',
  };
  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Button
          onClick={this.handleOpen}
        >Add to my calendar</Button>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={3000}
          onRequestClose={this.handleClose}
        />
      </div>
    );
  }
}

SimpleSnackbar.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
