import React, {Component} from 'react';
import BottomSheet from 'material-ui/BottomSheet';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * A simple persistent `BottomSheet`, controlled through the `open` prop.
 */

export default class BottomSheetExampleSimple extends Component {

  constructor() {
    super();
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle BottomSheet"
          onTouchTap={this.handleToggle}
        />
        <BottomSheet open={this.state.open}>
          <MenuItem>Menu item 1</MenuItem>
          <MenuItem>Menu item 2</MenuItem>
        </BottomSheet>
      </div>
    );
  }
}
