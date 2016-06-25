import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ClassNames from 'classnames';
import {createStyleSheet} from 'stylishly';
import {List, ListItem} from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Text from 'material-ui/Text';
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
    title: {
      color: theme.palette.text.secondary,
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
          <Toolbar>
            <Text className={classes.title} type="title">Material UI</Text>
            <Divider absolute={true} />
          </Toolbar>
          <List>
            <ListItem className={listLinkClass} el={Link} to="/home">
              Home
            </ListItem>
          </List>
        </div>
      </Drawer>
    );
  }
}
