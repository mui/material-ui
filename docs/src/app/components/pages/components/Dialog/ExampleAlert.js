import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class DialogExampleAlert extends React.Component {
  state = {
    open: false,
  };
    
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const buttonStyle = {    
      margin: 12,    
    };
        
    const actions = [
      <RaisedButton
        label="Cancel"        
        onTouchTap={this.handleClose}
        style = {buttonStyle}
      />,
      <RaisedButton
        label="Discard"        
        onTouchTap={this.handleClose}
        style = {buttonStyle}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Alert" onTouchTap={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Discard draft?
        </Dialog>
      </div>
    );
  }
}
