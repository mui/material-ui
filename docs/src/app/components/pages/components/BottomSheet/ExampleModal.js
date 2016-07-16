import React, {Component} from 'react';
import BottomSheet from 'material-ui/BottomSheet';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * A modal `BottomSheet`. When opened, the page is covered with an overlay. Touching
 * the overlay or swiping down will dismiss the `BottomSheet`.
 */
export default class BottomSheetExampleModal extends Component {
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
        <BottomSheet open={this.state.open} modal={true} onRequestClose={this.handleClose}>
          <MenuItem>Menu item 1</MenuItem>
          <MenuItem>Menu item 2</MenuItem>
          <MenuItem>Menu item 3</MenuItem>
          <MenuItem>Menu item 4</MenuItem>
          <MenuItem>Menu item 5</MenuItem>
        </BottomSheet>
      </div>
    );
  }
}
