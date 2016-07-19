import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * The `openSecondary` prop allows the Drawer to open on the opposite side.
 */
export default class DrawerExampleOpenSecondary extends Component {
  constructor() {
    super();
    this.state = {open: false};
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  };

  render() {
    return (
      <div>
        <RaisedButton label="Toggle Drawer" onTouchTap={this.handleToggle} />
        <Drawer width={200} openSecondary={true} open={this.state.open} >
          <AppBar title="AppBar" />
        </Drawer>
      </div>
    );
  }
}
