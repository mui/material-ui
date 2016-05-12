import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

/**
 * The dialog width has been set to occupy the full width of browser through the `contentStyle` property.
 */
export default class DialogExampleCustomWidth extends React.Component {
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
        primary={true}
        onTouchTap={this.handleClose}
        style = {buttonStyle}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleClose}
        style = {buttonStyle}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Dialog With Custom Width" onTouchTap={this.handleOpen} />
        <Dialog
          title="Dialog With Custom Width"
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
          This dialog spans the entire width of the screen.
        </Dialog>
      </div>
    );
  }
}
