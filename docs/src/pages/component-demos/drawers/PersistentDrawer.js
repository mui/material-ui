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
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

const drawerWidth = 240;

const styleSheet = createStyleSheet('PersistentDrawer', (theme) => ({
  demoContainer: {
    width: '100%',
    height: 434,
    marginTop: 32,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    order: 1,
    transition: theme.transitions.create(['margin', 'width'],
      { easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'],
      { easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
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
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 56,
    padding: '0 8px',
  },
  navItem: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  navItemText: {
    padding: '0 16px',
  },
  content: {
    height: 'calc(100% - 56px)',
    width: '100%',
    marginTop: 56,
    marginLeft: -drawerWidth,
    flexGrow: 1,
    backgroundColor: '#fafafa',
    padding: 24,
    transition: theme.transitions.create('margin',
      { easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin',
      { easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
  },
  [theme.breakpoints.up('sm')]: {
    content: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
    drawerHeader: {
      height: 64,
    },
  },
}));

class PersistentDrawer extends Component {
  state = {
    open: false,
  };

  toggleDrawer = (open) => {
    this.setState({ open });
  };

  handleDrawerOpen = () => this.toggleDrawer(true);
  handleDrawerClose = () => this.toggleDrawer(false);

  render() {
    const classes = this.props.classes;

    const mailFolderListItems = (
      <div>
        <ListItem button className={classes.navItem}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Inbox
          </Typography>
        </ListItem>
        <ListItem button className={classes.navItem}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Starred
          </Typography>
        </ListItem>
        <ListItem button className={classes.navItem}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Send mail
          </Typography>
        </ListItem>
        <ListItem button className={classes.navItem}>
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
        <ListItem button className={classes.navItem}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            All mail
          </Typography>
        </ListItem>
        <ListItem button className={classes.navItem}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Trash
          </Typography>
        </ListItem>
        <ListItem button className={classes.navItem}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Spam
          </Typography>
        </ListItem>
      </div>
    );

    return (
      <div className={classes.demoContainer}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
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
          <Drawer
            type="persistent"
            paperClassName={classes.drawerPaper}
            open={this.state.open}
            /* Required for this demo to work
             * because the demo container is not the viewport:
             */
            slideFromOutsideSelf
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
          <main className={classNames(classes.content, this.state.open && classes.contentShift)}>
            {/* eslint-disable max-len */}
            <Typography type="body1">
              {"You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man."}
            </Typography>
            {/* eslint-enable */}
          </main>
        </div>
      </div>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PersistentDrawer);
