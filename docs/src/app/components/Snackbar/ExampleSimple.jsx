import React from 'react';
import Snackbar from 'material-ui/lib/snackbar';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

export default class SnackbarExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 0,
      message: 'Event added to your calendar',
    };
  }

  handleTouchTap = () => {
    this.refs.snackbar.show();
  }

  handleActionTouchTap = () => {
    alert('We removed the event from your calendar.');
  }

  handleChangeDuration = (event) => {
    const value = event.target.value;
    this.setState({
      autoHideDuration: value.length > 0 ? parseInt(value) : 0,
    });
  }

  render() {
    return (
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="Add to my calendar"
        />
        <br />
        <TextField
          floatingLabelText="Auto Hide Duration in ms"
          value={this.state.autoHideDuration}
          onChange={this.handleChangeDuration}
        />
        <Snackbar
          ref="snackbar"
          message={this.state.message}
          action="undo"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this.handleActionTouchTap}
        />
      </div>
    );
  }
}

export default SnackbarExampleSimple;
