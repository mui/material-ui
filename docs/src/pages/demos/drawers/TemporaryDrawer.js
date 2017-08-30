/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const styles = {
  list: {
    width: 250,
    flex: 'initial',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
};

class TemporaryDrawer extends React.Component {
  state = {
    open: {
      top: false,
      left: false,
      bottom: false,
      right: false,
    },
  };

  toggleDrawer = (side, open) => {
    const drawerState = {};
    drawerState[side] = open;
    this.setState({ open: drawerState });
  };

  handleTopOpen = () => {
    this.toggleDrawer('top', true);
  };

  handleTopClose = () => {
    this.toggleDrawer('top', false);
  };

  handleLeftOpen = () => {
    this.toggleDrawer('left', true);
  };

  handleLeftClose = () => {
    this.toggleDrawer('left', false);
  };

  handleBottomOpen = () => {
    this.toggleDrawer('bottom', true);
  };

  handleBottomClose = () => {
    this.toggleDrawer('bottom', false);
  };

  handleRightOpen = () => {
    this.toggleDrawer('right', true);
  };

  handleRightClose = () => {
    this.toggleDrawer('right', false);
  };

  render() {
    const classes = this.props.classes;

    const sideList = (
      <div>
        <List className={classes.list}>{mailFolderListItems}</List>
        <Divider />
        <List className={classes.list}>{otherMailFolderListItems}</List>
      </div>
    );

    const fullList = (
      <div>
        <List className={classes.listFull}>{mailFolderListItems}</List>
        <Divider />
        <List className={classes.listFull}>{otherMailFolderListItems}</List>
      </div>
    );

    return (
      <div>
        <Button onClick={this.handleLeftOpen}>Open Left</Button>
        <Button onClick={this.handleRightOpen}>Open Right</Button>
        <Button onClick={this.handleTopOpen}>Open Top</Button>
        <Button onClick={this.handleBottomOpen}>Open Bottom</Button>
        <Drawer
          open={this.state.open.left}
          onRequestClose={this.handleLeftClose}
          onClick={this.handleLeftClose}
        >
          {sideList}
        </Drawer>
        <Drawer
          anchor="top"
          open={this.state.open.top}
          onRequestClose={this.handleTopClose}
          onClick={this.handleTopClose}
        >
          {fullList}
        </Drawer>
        <Drawer
          anchor="bottom"
          open={this.state.open.bottom}
          onRequestClose={this.handleBottomClose}
          onClick={this.handleBottomClose}
        >
          {fullList}
        </Drawer>
        <Drawer
          anchor="right"
          open={this.state.open.right}
          onRequestClose={this.handleRightClose}
          onClick={this.handleRightClose}
        >
          {sideList}
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
