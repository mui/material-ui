import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

const DialogExampleSimple = React.createClass({

  getInitialState() {
    return {open: false};
  },

  handleOpen() {
    this.setState({open: true});
  },

  handleClose() {
    this.setState({open: false});
  },

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose} />,
    ];

    return (
      <RaisedButton label="Dialog With Actions" onTouchTap={this.handleOpen}>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          The actions in this window were passed in as an array of react objects.
        </Dialog>
      </RaisedButton>
    );
  },
});

export default DialogExampleSimple;
