import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ClassNames from 'classnames';
import {createStyleSheet} from 'stylishly';
import {List, ListItem, ListItemIcon} from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

export const styleSheet = createStyleSheet('AppDrawer', (theme) => {
  return {
    paper: {
      width: '275px',
      backgroundColor: theme.palette.background.paper,
    },
    nav: {
      flex: '1 0 auto',
      navItem: {
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
      },
      navLink: {
        '&:hover': {
          backgroundColor: theme.palette.text.divider,
        },
        '&:active': {
          color: theme.palette.accent.A200,
        },
      },
    },
    footer: {
      flex: '0 0 auto',
    },
    copyright: {
      fontSize: 12,
      background: theme.palette.grey[100],
      color: theme.palette.grey[600],
      padding: '10px 16px',
    },
  };
});

export default class AppDrawer extends Component {
  static propTypes = {
    children: PropTypes.any,
    open: PropTypes.bool,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const listLinkClass = ClassNames(classes.navItem, classes.navLink);
    return (
      <Drawer paperClassName={classes.paper} {...this.props}>
        <div className={classes.nav}>
          <Toolbar gutters={false}>
            Material UI
            <Divider absolute={true} />
          </Toolbar>
          <List>
            <ListItem className={listLinkClass} el={Link} to="/inbox">
              <ListItemIcon className="material-icons">inbox</ListItemIcon> Inbox
            </ListItem>
            <ListItem className={listLinkClass} el={Link} to="/inbox">
              <ListItemIcon className="material-icons">star</ListItemIcon> Starred
            </ListItem>
            <ListItem className={listLinkClass} el={Link} to="/inbox">
              <ListItemIcon className="material-icons">send</ListItemIcon> Sent mail
            </ListItem>
            <ListItem className={listLinkClass} el={Link} to="/inbox">
              <ListItemIcon className="material-icons">drafts</ListItemIcon> Drafts
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem className={listLinkClass} el={Link} to="/inbox">
              <ListItemIcon className="material-icons">email</ListItemIcon> All mail
            </ListItem>
            <ListItem className={listLinkClass} el={Link} to="/inbox">
              <ListItemIcon className="material-icons">delete</ListItemIcon> Trash
            </ListItem>
            <ListItem className={listLinkClass} el={Link} to="/inbox">
              <ListItemIcon className="material-icons">report</ListItemIcon> Spam
            </ListItem>
          </List>
        </div>
        <footer className={classes.footer}>
          <Divider />
          <List className={classes.nav}>
            <ListItem className={listLinkClass} el={Link} to="/inbox">
              <ListItemIcon className="material-icons">eject</ListItemIcon> Sign Out
            </ListItem>
          </List>
          <div className={classes.copyright}>&copy;2016 HAL9000</div>
        </footer>
      </Drawer>
    );
  }
}
