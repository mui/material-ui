import React from 'react';
import Snackbar from 'material-ui/lib/snackbar';
import RaisedButton from 'material-ui/lib/raised-button';

export default class SnackbarExampleTwice extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'Event added to your calendar',
    };
  }

  handleTouchTap = () => {
    this.refs.snackbar.show();

    setTimeout(() => {
      this.setState({
        message: 'Event ' + Math.round(Math.random() * 100) + ' added to your calendar',
      });
    }, 1500);
  }

  render() {
    return (
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="Add to my calendar two times"
        />
        <Snackbar
          ref="snackbar"
          message={this.state.message}
          action="undo"
          autoHideDuration={3000}
        />
      </div>
    );
  }
}

export default SnackbarExampleTwice;
