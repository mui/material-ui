// @flow weak

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { createStyleSheet } from 'jss-theme-reactor';
import { List } from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Text from 'material-ui/Text';
import Divider from 'material-ui/Divider';
import shallowEqual from 'recompose/shallowEqual';
import AppDrawerNavItem from './AppDrawerNavItem';

export const styleSheet = createStyleSheet('AppDrawer', (theme) => {
  return {
    paper: {
      width: '250px',
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      color: theme.palette.text.secondary,
      '&:hover': {
        textDecoration: 'none',
        color: theme.palette.primary[500],
      },
    },
  };
});

export default class AppDrawer extends Component {
  static propTypes = {
    className: PropTypes.string,
    docked: PropTypes.bool,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    routes: PropTypes.array,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
    styleManager: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context, nextContext)
    );
  }

  activeParent = undefined;

  reduceChildRoutes = (items, childRoute, index) => {
    if (childRoute.nav) {
      if (childRoute.childRoutes && childRoute.childRoutes.length) {
        const openImmediately = this.props.routes.indexOf(childRoute) !== -1 || false;
        items.push(
          <AppDrawerNavItem
            key={index}
            openImmediately={openImmediately}
            title={childRoute.title}
          >
            {this.renderNav(childRoute)}
          </AppDrawerNavItem>
        );
      } else {
        items.push(
          <AppDrawerNavItem
            key={index}
            title={childRoute.title}
            to={childRoute.path}
            onClick={this.props.onRequestClose}
          />
        );
      }
    }
    return items;
  };

  renderNav(navRoot, props = {}) {
    return (
      <List {...props}>
        {this.renderNavItems(navRoot)}
      </List>
    );
  }

  renderNavItems(navRoot) {
    this.activeParent = undefined;
    if (navRoot.childRoutes && navRoot.childRoutes.length) {
      return navRoot.childRoutes.reduce(this.reduceChildRoutes, []);
    }
    return null;
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <Drawer
        className={this.props.className}
        paperClassName={classes.paper}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        docked={this.props.docked}
      >
        <div className={classes.nav}>
          <Toolbar>
            <Link className={classes.title} to="/" onClick={this.props.onRequestClose}>
              <Text type="title">Material UI</Text>
            </Link>
            <Divider absolute />
          </Toolbar>
          {this.renderNav(this.props.routes[0])}
        </div>
      </Drawer>
    );
  }
}
