import React from 'react';
import Popper from '@material-ui/core/Popper';

class MinimalPopper extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  };

  render() {
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : null;

    return (
      <div>
        <button aria-describedby={id} type="button" onClick={this.handleClick}>
          Toggle Popper
        </button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <div>The content of the Popper.</div>
        </Popper>
      </div>
    );
  }
}

export default MinimalPopper;
