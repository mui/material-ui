import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionLeft(props) {
  return <Slide direction="left" {...props} />;
}

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}

function TransitionRight(props) {
  return <Slide direction="right" {...props} />;
}

function TransitionDown(props) {
  return <Slide direction="down" {...props} />;
}

class DirectionSnackbar extends React.Component {
  state = {
    open: false,
    Transition: null,
  };

  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick(TransitionLeft)}>Right</Button>
        <Button onClick={this.handleClick(TransitionUp)}>Up</Button>
        <Button onClick={this.handleClick(TransitionRight)}>Left</Button>
        <Button onClick={this.handleClick(TransitionDown)}>Down</Button>
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">I love snacks</span>}
        />
      </div>
    );
  }
}

export default DirectionSnackbar;
