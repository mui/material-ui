// @flow weak

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

class PositionedSnackbar extends Component {
  state = {
    open: false,
    vertical: null,
    horizontal: null,
  };

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <Button onClick={this.handleClick({ vertical: 'top', horizontal: 'center' })}>
          Top-Center
        </Button>
        <Button onClick={this.handleClick({ vertical: 'top', horizontal: 'right' })}>
          Top-Right
        </Button>
        <Button onClick={this.handleClick({ vertical: 'bottom', horizontal: 'right' })}>
          Bottom-Right
        </Button>
        <Button onClick={this.handleClick({ vertical: 'bottom', horizontal: 'center' })}>
          Bottom-Center
        </Button>
        <Button onClick={this.handleClick({ vertical: 'bottom', horizontal: 'left' })}>
          Bottom-Left
        </Button>
        <Button onClick={this.handleClick({ vertical: 'top', horizontal: 'left' })}>
          Top-Left
        </Button>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onRequestClose={this.handleRequestClose}
          contentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">I love snacks</span>}
        />
      </div>
    );
  }
}

export default PositionedSnackbar;
