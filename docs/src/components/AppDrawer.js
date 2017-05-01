// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet } from 'jss-theme-reactor';
import shallowEqual from 'recompose/shallowEqual';
import { List } from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import customPropTypes from 'material-ui/utils/customPropTypes';
import AppDrawerNavItem from 'docs/src/components/AppDrawerNavItem';
import Link from 'docs/src/components/Link';

export const styleSheet = createStyleSheet('AppDrawer', (theme) => {
  return {
    paper: {
      width: 250,
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      color: theme.palette.text.secondary,
      '&:hover': {
        color: theme.palette.primary[500],
      },
    },
    toolbar: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    anchor: {
      color: theme.palette.text.secondary,
    },
  };
});

function renderNavItems(props, navRoot) {
  let navItems = null;

  if (navRoot.childRoutes && navRoot.childRoutes.length) {
    navItems = navRoot.childRoutes.reduce(reduceChildRoutes.bind(null, props), []);
  }

  return (
    <List>
      {navItems}
    </List>
  );
}

function reduceChildRoutes(props, items, childRoute, index) {
  if (childRoute.nav) {
    if (childRoute.childRoutes && childRoute.childRoutes.length) {
      const openImmediately = props.routes.indexOf(childRoute) !== -1 || false;
      items.push(
        <AppDrawerNavItem
          key={index}
          openImmediately={openImmediately}
          title={childRoute.title}
        >
          {renderNavItems(props, childRoute)}
        </AppDrawerNavItem>,
      );
    } else {
      items.push(
        <AppDrawerNavItem
          key={index}
          title={childRoute.title}
          to={childRoute.path}
          onClick={props.onRequestClose}
        />,
      );
    }
  }
  return items;
}

export default class AppDrawer extends Component {
  static propTypes = {
    className: PropTypes.string,
    docked: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    routes: PropTypes.array.isRequired,
  };

  static contextTypes = {
    theme: customPropTypes.muiRequired,
    styleManager: customPropTypes.muiRequired,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context, nextContext)
    );
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const GITHUB_RELEASE_BASE_URL = 'https://github.com/callemall/material-ui/releases/tag/';

    return (
      <Drawer
        className={this.props.className}
        paperClassName={classes.paper}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        docked={this.props.docked}
      >
        <div className={classes.nav}>
          <Toolbar className={classes.toolbar}>
            <Link className={classes.title} to="/" onClick={this.props.onRequestClose}>
              <Typography type="title" gutterBottom colorInherit>
                Material UI
              </Typography>
            </Link>
            {process.env.MATERIAL_UI_VERSION ? (
              <Link
                className={classes.anchor}
                href={`${GITHUB_RELEASE_BASE_URL}v${process.env.MATERIAL_UI_VERSION}`}
              >
                <Typography type="caption">{`v${process.env.MATERIAL_UI_VERSION}`}</Typography>
              </Link>
            ) : null}
            <Divider absolute />
          </Toolbar>
          {renderNavItems(this.props, this.props.routes[0])}
        </div>
      </Drawer>
    );
  }
}
