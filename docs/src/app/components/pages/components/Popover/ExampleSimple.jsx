import React from 'react';
import Popover from 'material-ui/lib/popover/popover';
import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  popover: {
    padding: 20,
  },
};

export default class PopoverExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
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
          label="Click me"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <div style={styles.popover}>
            <RaisedButton primary={true} label="Here is a button"/>
          </div>
        </Popover>
      </div>
    );
  }
}
