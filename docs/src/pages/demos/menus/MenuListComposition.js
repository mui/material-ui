/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from 'material-ui/internal/ClickAwayListener';

const styles = {
  root: {
    display: 'flex',
  },
};

class MenuListComposition extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Paper>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Paper>
        <Manager>
          <Target>
            <Button
              aria-owns={this.state.open ? 'menu-list' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              Open Menu
            </Button>
          </Target>
          <Popper placement="bottom-start" eventsEnabled={open}>
            <ClickAwayListener onClickAway={this.handleRequestClose}>
              <Grow in={open} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role="menu">
                    <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleRequestClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleRequestClose}>Logout</MenuItem>
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
