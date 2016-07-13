import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ClassNames from 'classnames';
import {createStyleSheet} from 'stylishly';
import {List} from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Text from 'material-ui/Text';
import Divider from 'material-ui/Divider';
import shallowEqual from 'recompose/shallowEqual';

import AppDrawerNavItem from './AppDrawerNavItem';

export const styleSheet = createStyleSheet('AppDrawer', (theme) => {
  return {
    drawer: {
      width: '250px',
    },
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
    docked: PropTypes.bool,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    routes: PropTypes.array,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  activeParent = undefined;

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
  }

  reduceChildRoutes = (items, childRoute, index) => {
    if (childRoute.nav) {
      if (childRoute.childRoutes && childRoute.childRoutes.length) {
        let openImmediately = this.props.routes.indexOf(childRoute) !== -1 || false;
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
          />
        );
      }
    }
    return items;
  };

  render() {
    this.classes = this.context.styleManager.render(styleSheet);
    return (
      <Drawer
        className={this.classes.drawer}
        paperClassName={this.classes.paper}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        docked={this.props.docked}
      >
        <div className={this.classes.nav}>
          <Toolbar>
            <Link className={this.classes.title} to="/" onClick={this.props.onRequestClose}>
              <Text type="title">Material UI</Text>
            </Link>
            <Divider absolute={true} />
          </Toolbar>
          {this.renderNav(this.props.routes[0])}
        </div>
      </Drawer>
    );
  }
}
