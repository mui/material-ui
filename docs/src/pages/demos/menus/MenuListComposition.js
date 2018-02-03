import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
import Button from 'material-ui/Button';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Popover from 'material-ui/Popover';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  popperClose: {
    pointerEvents: 'none',
  },
};

class MenuListComposition extends React.Component {
  state = {
    // in the Popover example, an anchor is used
    // to manage open/close state and position
    anchor: undefined,
    // in the react-popper example, the anchor is managed with an id,
    // and open/close state by this boolean
    open: false,
    // those 2 approaches can be used interchangeably
  };

  handleClickBasic = anchor => {
    this.setState({ anchor });
  };

  handleClickPopper = () => {
    this.setState({ open: true });
  };

  handleClosePopper = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { anchor, open } = this.state;

    return (
      <div className={classes.root}>
        <Paper>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Paper>
        <Button
          aria-owns={anchor || null}
          aria-haspopup="true"
          onClick={event => this.handleClickBasic(event.currentTarget)}
        >
          Open MenuBasic
        </Button>
        <Popover
          open={Boolean(anchor)}
          anchorReference="anchorEl"
          anchorEl={anchor}
          onClose={() => this.handleClickBasic()}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MenuList component="nav" role="menu">
            <MenuItem component={Button} disableGutters onClick={() => this.handleClickBasic()}>
              Profile
            </MenuItem>
            <MenuItem component={Button} disableGutters onClick={() => this.handleClickBasic()}>
              Logout
            </MenuItem>
          </MenuList>
        </Popover>
        <Manager>
          <Target>
            <Button
              aria-owns={open ? 'menu-list-popper' : null}
              aria-haspopup="true"
              onClick={this.handleClickPopper}
            >
              Open MenuPopper
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            <ClickAwayListener onClickAway={this.handleClosePopper}>
              <Grow in={open} id="menu-list-popper" style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role="menu">
                    <MenuItem onClick={this.handleClosePopper}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClosePopper}>My account</MenuItem>
                    <MenuItem onClick={this.handleClosePopper}>Logout</MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListComposition);
