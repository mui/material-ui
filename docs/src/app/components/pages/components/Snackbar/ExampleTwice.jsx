import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

export default class SnackbarExampleTwice extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'Event 1 added to your calendar',
      open: false,
    };
    this.timer = undefined;
  }

  componentWillUnMount() {
    clearTimeout(this.timer);
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });

    this.timer = setTimeout(() => {
      this.setState({
        message: `Event ${Math.round(Math.random() * 100)} added to your calendar`,
      });
    }, 1500);
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="Add to my calendar two times"
        />
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          action="undo"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default SnackbarExampleTwice;
