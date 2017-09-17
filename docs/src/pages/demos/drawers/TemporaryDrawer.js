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
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
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
        <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
        <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
        <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
        <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>
        <Drawer open={this.state.left} onRequestClose={this.toggleDrawer('left', false)}>
          <div tabIndex={0} role="button" onClick={this.toggleDrawer('left', false)}>
            {sideList}
          </div>
        </Drawer>
        <Drawer anchor="top" open={this.state.top} onRequestClose={this.toggleDrawer('top', false)}>
          <div tabIndex={0} role="button" onClick={this.toggleDrawer('top', false)}>
            {fullList}
          </div>
        </Drawer>
        <Drawer
          anchor="bottom"
          open={this.state.bottom}
          onRequestClose={this.toggleDrawer('bottom', false)}
        >
          <div tabIndex={0} role="button" onClick={this.toggleDrawer('bottom', false)}>
            {fullList}
          </div>
        </Drawer>
        <Drawer
          anchor="right"
          open={this.state.right}
          onRequestClose={this.toggleDrawer('right', false)}
        >
          <div tabIndex={0} role="button" onClick={this.toggleDrawer('right', false)}>
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
