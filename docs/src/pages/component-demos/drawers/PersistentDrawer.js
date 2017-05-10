// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

const drawerWidth = 250;

const styleSheet = createStyleSheet('PersistentDrawer', () => ({
  demoFrame: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 32,
    zIndex: 1,
  },
  appBar: {
    position: 'relative',
    width: 'auto',
    flex: '1 0 auto',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: 'auto',
    width: drawerWidth, // Required to make the transition work.
  },
  drawerInner: {
    width: drawerWidth, // Makes the items inside not wrap.
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 64,
    padding: '0 8px',
  },
  listItemText: {
    padding: '0 16px',
  },
}));

class PersistentDrawer extends Component {
  state = {
    open: true,
  };

  toggleDrawer = (open) => {
    const drawerState = open;
    this.setState({ open: drawerState });
  };

  handleDrawerOpen = () => this.toggleDrawer(true);
  handleDrawerClose = () => this.toggleDrawer(false);

  render() {
    const classes = this.props.classes;

    const mailFolderListItems = (
      <div>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.listItemText}>
            Inbox
          </Typography>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.listItemText}>
            Starred
          </Typography>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.listItemText}>
            Send mail
          </Typography>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.listItemText}>
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
          <Typography type="body2" className={classes.listItemText}>
            All mail
          </Typography>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.listItemText}>
            Trash
          </Typography>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.listItemText}>
            Spam
          </Typography>
        </ListItem>
      </div>
    );

    return (
      <div className={classes.demoFrame}>
        <Drawer
          type="persistent"
          paperClassName={classes.drawerPaper}
          open={this.state.open}
        >
          <div className={classes.drawerInner}>
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List className={classes.list}>
              {mailFolderListItems}
            </List>
            <Divider />
            <List className={classes.list}>
              {otherMailFolderListItems}
            </List>
          </div>
        </Drawer>
        <AppBar className={classes.appBar}>
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
              contrast
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" colorInherit noWrap>
              Persistent navigation drawer
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PersistentDrawer);
