// @flow weak

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class AlertDialog extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ open: true })}>Open alert dialog</Button>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
