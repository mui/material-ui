// @flow weak

import React, { Component } from 'react';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import { pink } from 'material-ui/styles/colors';

export default class SimpleActionSnackbar extends Component {
  state = {
    open: false,
    message: 'Event added',
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
          action={<Button
            style={{ marginRight: -16, color: pink.A200 }}
            onClick={() => {
              alert('Event is being removed');
            }}
          >UNDO</Button>}
        />
      </div>
    );
  }
}

SimpleActionSnackbar.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
