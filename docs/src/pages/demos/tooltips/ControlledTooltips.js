import React from 'react';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

class ControlledTooltips extends React.Component {
  state = {
    open: false,
  };

  handleIconButtonClose = () => {
    this.setState({ open: false });
  };

  handleIconButtonOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <Tooltip
        id="tooltip-controlled"
        title="Delete"
        onClose={this.handleIconButtonClose}
        enterDelay={300}
        leaveDelay={300}
        onOpen={this.handleIconButtonOpen}
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
