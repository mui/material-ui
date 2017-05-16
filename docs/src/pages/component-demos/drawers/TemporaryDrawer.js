// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

const styleSheet = createStyleSheet('TemporaryDrawer', () => ({
  drawerPaper: {
    width: 250,
  },
  fullWidth: {
    width: '100%',
    maxWidth: 'initial',
  },
  navItemText: {
    padding: '0 16px',
  },
}));

class TemporaryDrawer extends Component {
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

  handleTopOpen = () => this.toggleDrawer('top', true);
  handleTopClose = () => this.toggleDrawer('top', false);
  handleLeftOpen = () => this.toggleDrawer('left', true);
  handleLeftClose = () => this.toggleDrawer('left', false);
  handleBottomOpen = () => this.toggleDrawer('bottom', true);
  handleBottomClose = () => this.toggleDrawer('bottom', false);
  handleRightOpen = () => this.toggleDrawer('right', true);
  handleRightClose = () => this.toggleDrawer('right', false);

  render() {
    const classes = this.props.classes;

    const mailFolderListItems = (
      <div>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Inbox
          </Typography>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Starred
          </Typography>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Send mail
          </Typography>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Drafts
          </Typography>
        </ListItem>
      </div>
    );

    const otherMailFolderListItems = (
      <div>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            All mail
          </Typography>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Trash
          </Typography>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Spam
          </Typography>
        </ListItem>
      </div>
    );

    const list = (
      <div>
        <List>
          {mailFolderListItems}
        </List>
        <Divider />
        <List>
          {otherMailFolderListItems}
        </List>
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
          paperClassName={classes.drawerPaper}
        >
          {list}
        </Drawer>
        <Drawer
          anchor="top"
          open={this.state.open.top}
          onRequestClose={this.handleTopClose}
          onClick={this.handleTopClose}
          paperClassName={classes.fullWidth}
        >
          {list}
        </Drawer>
        <Drawer
          anchor="bottom"
          open={this.state.open.bottom}
          onRequestClose={this.handleBottomClose}
          onClick={this.handleBottomClose}
          paperClassName={classes.fullWidth}
        >
          {list}
        </Drawer>
        <Drawer
          anchor="right"
          open={this.state.open.right}
          onRequestClose={this.handleRightClose}
          onClick={this.handleRightClose}
          paperClassName={classes.drawerPaper}
        >
          {list}
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(TemporaryDrawer);
