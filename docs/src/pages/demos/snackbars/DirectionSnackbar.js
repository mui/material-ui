import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';

class DirectionSnackbar extends React.Component {
  static defaultProps: {};
  state = {
    open: false,
    direction: null,
  };

  handleClick = direction => () => {
    this.setState({ open: true, direction });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick('left')}>Right</Button>
        <Button onClick={this.handleClick('up')}>Up</Button>
        <Button onClick={this.handleClick('right')}>Left</Button>
        <Button onClick={this.handleClick('down')}>Down</Button>
        <Snackbar
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction={this.state.direction} />}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">I love snacks</span>}
        />
      </div>
    );
  }
}

export default DirectionSnackbar;
