// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui/svg-icons/inbox';
import DraftsIcon from 'material-ui/svg-icons/drafts';
import StarIcon from 'material-ui/svg-icons/star';
import SendIcon from 'material-ui/svg-icons/send';
import MailIcon from 'material-ui/svg-icons/mail';
import DeleteIcon from 'material-ui/svg-icons/delete';
import ReportIcon from 'material-ui/svg-icons/report';


const styleSheet = createStyleSheet('UndockedDrawer', () => ({
  list: {
    width: 250,
    flex: 'initial',
  },
  remainder: {
    flex: 1,
  },
}));

export default class UndockedDrawer extends Component {
  state = {
    open: false,
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div>
        <Button onClick={this.handleOpen}>Open Drawer</Button>
        <Drawer
          open={this.state.open}
          onRequestClose={this.handleClose}
          onClick={this.handleClose}
        >
          <List className={classes.list} padding={false}>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Send mail" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>
          </List>
          <Divider />
          <List className={classes.list} padding={false}>
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="All mail" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Trash" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ReportIcon />
              </ListItemIcon>
              <ListItemText primary="Spam" />
            </ListItem>
          </List>
          <div className={classes.remainder} />
        </Drawer>
      </div>
    );
  }
}

UndockedDrawer.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
