/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import { Manager, Reference, Popper } from 'react-popper';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
  },
  popover: {
    pointerEvents: 'none',
  },
  popperClose: {
    pointerEvents: 'none',
  },
});

class MouseOverPopover extends React.Component {
  state = {
    anchorEl: null,
    popperOpen: false,
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.target });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  handlePopperOpen = () => {
    this.setState({ popperOpen: true });
  };

  handlePopperClose = () => {
    this.setState({ popperOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, popperOpen } = this.state;
    const open = !!anchorEl;

    return (
      <div className="wrapper">
        <Typography onMouseOver={this.handlePopoverOpen} onMouseOut={this.handlePopoverClose}>
          Hover with a Popover.
        </Typography>
        <Popover
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>I use Popover.</Typography>
        </Popover>
        <Manager>
          <Reference>
            {({ ref }) => (
              <div ref={ref}>
                <Typography
                  aria-describedby="react-popper-tooltip"
                  onMouseOver={this.handlePopperOpen}
                  onMouseOut={this.handlePopperClose}
                >
                  Hover with react-popper.
                </Typography>
              </div>
            )}
          </Reference>
          <Popper
            placement="bottom-start"
            eventsEnabled={popperOpen}
            className={!popperOpen ? classes.popperClose : ''}
          >
            {({ ref, style }) => (
              <div ref={ref} style={style}>
                <Grow in={popperOpen} style={{ transformOrigin: '0 0 0' }}>
                  <Paper
                    id="react-popper-tooltip"
                    className={classes.paper}
                    role="tooltip"
                    aria-hidden={!popperOpen}
                    elevation={8}
                  >
                    <Typography>I use react-popper.</Typography>
                  </Paper>
                </Grow>
              </div>
            )}
          </Popper>
        </Manager>
      </div>
    );
  }
}

MouseOverPopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MouseOverPopover);
