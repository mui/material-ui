import React from 'react';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

class ControlledTooltips extends React.Component {
  state = {
    open: false,
  };

  handleIconButtonRequestClose = () => {
    this.setState({ open: false });
  };

  handleIconButtonRequestOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <Tooltip
        id="tooltip-controlled"
        title="Delete"
        onRequestClose={this.handleIconButtonRequestClose}
        enterDelay={300}
        leaveDelay={300}
        onRequestOpen={this.handleIconButtonRequestOpen}
        open={this.state.open}
        placement="bottom"
      >
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    );
  }
}

export default ControlledTooltips;
