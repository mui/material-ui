import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * A simple controlled `Drawer`. The Drawer is `docked` by default, remaining open
 * unless closed through the `open` prop.
 */
export default class DrawerExampleSimple extends Component {
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
        <Drawer open={this.state.open}>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <Divider />
          <MenuItem onTouchTap={this.handleToggle}>Close this simple Drawer</MenuItem>
        </Drawer>
      </div>
    );
  }
}
