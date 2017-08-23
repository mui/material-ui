import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

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

class UndockedDrawer extends React.Component {
  static defaultProps: $FlowFixMeProps;
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
      </div>
    );

    const otherMailFolderListItems = (
      <div>
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
      </div>
    );

    const sideList = (
      <div>
        <List className={classes.list} disablePadding>
          {mailFolderListItems}
        </List>
        <Divider />
        <List className={classes.list} disablePadding>
          {otherMailFolderListItems}
        </List>
      </div>
    );

    const fullList = (
      <div>
        <List className={classes.listFull} disablePadding>
          {mailFolderListItems}
        </List>
        <Divider />
        <List className={classes.listFull} disablePadding>
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

UndockedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UndockedDrawer);
