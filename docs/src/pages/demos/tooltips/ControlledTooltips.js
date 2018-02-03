import React from 'react';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

class ControlledTooltips extends React.Component {
  state = {
    open: false,
  };

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <Tooltip
        id="tooltip-controlled"
        title="Delete"
        onClose={this.handleTooltipClose}
        enterDelay={300}
        leaveDelay={300}
        onOpen={this.handleTooltipOpen}
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
