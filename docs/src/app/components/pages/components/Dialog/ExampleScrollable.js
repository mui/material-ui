import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class DialogExampleScrollable extends React.Component {
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
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    const str = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus scelerisque urna in aliquam.
    Mauris vitae iaculis orci. Mauris rhoncus ultricies lectus, et eleifend erat lacinia id. Vivamus dolor arcu,
    euismod sagittis tortor et, lacinia malesuada felis. Suspendisse consectetur elit lorem, sed feugiat justo
    sollicitudin ac. Morbi dictum finibus purus. Suspendisse velit quam, consectetur id ipsum eget, hendrerit
    tincidunt elit. Aenean vehicula orci at risus viverra, ut consectetur nisl venenatis. Vivamus sodales, sapien non
    hendrerit imperdiet, tellus libero dictum metus, nec molestie mauris elit a risus. Nam porttitor metus eget lorem
    blandit, quis tincidunt metus accumsan. Phasellus at justo in velit pulvinar lacinia eget consectetur eros.
    Phasellus euismod lacus quis laoreet sollicitudin. Suspendisse eget felis fermentum, maximus ex quis, facilisis
    urna. Proin vitae mauris et massa feugiat aliquet id eget sem. Nullam efficitur ultricies mi, at hendrerit lacus
    egestas quis. Interdum et malesuada fames ac ante ipsum primis in faucibus.`;

    return (
      <div>
        <RaisedButton label="Scrollable Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="Scrollable Dialog"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <p>{str}</p>
          <p>{str}</p>
          <p>{str}</p>
          <p>{str}</p>
        </Dialog>
      </div>
    );
  }
}
