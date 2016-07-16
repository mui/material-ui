import React, {Component} from 'react';
import BottomSheet from 'material-ui/BottomSheet';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * An inset `BottomSheet` with a custom width.
 */
export default class BottomSheetExampleInset extends Component {
  constructor() {
    super();
    this.state = {open: false};
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div>
        <RaisedButton label="Toggle BottomSheet" onTouchTap={this.handleToggle} />
        <BottomSheet open={this.state.open} width="80%" onRequestClose={this.handleClose}>
          <MenuItem>Menu item 1</MenuItem>
          <MenuItem>Menu item 2</MenuItem>
        </BottomSheet>
      </div>
    );
  }
}
