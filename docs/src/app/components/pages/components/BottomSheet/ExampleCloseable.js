import React, {Component} from 'react';
import BottomSheet from 'material-ui/BottomSheet';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * A `BottomSheet` that can be dismissed by swiping down from the top of the sheet.
 */

export default class BottomSheetExampleCloseable extends Component {

  constructor() {
    super();
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle BottomSheet"
          onTouchTap={this.handleToggle}
        />
        <BottomSheet open={this.state.open} onRequestClose={this.handleClose}>
          <MenuItem>Menu item 1</MenuItem>
          <MenuItem>Menu item 2</MenuItem>
        </BottomSheet>
      </div>
    );
  }
}
