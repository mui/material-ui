// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import AppDrawerNavItem from 'docs/src/components/AppDrawerNavItem';
import Link from 'docs/src/components/Link';

const styles = theme => ({
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
});

function renderNavItems(props, navRoot) {
  let navItems = null;

  if (navRoot.childRoutes && navRoot.childRoutes.length) {
    // eslint-disable-next-line no-use-before-define
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
        <AppDrawerNavItem key={index} openImmediately={openImmediately} title={childRoute.title}>
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

function AppDrawer(props) {
  const { classes, className, docked, onRequestClose, routes } = props;
  const GITHUB_RELEASE_BASE_URL = 'https://github.com/callemall/material-ui/releases/tag/';
  let other = {};

  if (!docked) {
    other = {
      keepMounted: true,
    };
  }

  return (
    <Drawer
      className={className}
      classes={{
        paper: classes.paper,
      }}
      open={props.open}
      onRequestClose={onRequestClose}
      docked={docked}
      {...other}
    >
      <div className={classes.nav}>
        <Toolbar className={classes.toolbar}>
          <Link className={classes.title} to="/" onClick={onRequestClose}>
            <Typography type="title" gutterBottom color="inherit">
              Material-UI
            </Typography>
          </Link>
          {process.env.MATERIAL_UI_VERSION
            ? <Link
                className={classes.anchor}
                href={`${GITHUB_RELEASE_BASE_URL}v${process.env.MATERIAL_UI_VERSION}`}
              >
                <Typography type="caption">{`v${process.env.MATERIAL_UI_VERSION}`}</Typography>
              </Link>
            : null}
          <Divider absolute />
        </Toolbar>
        {renderNavItems(props, routes[0])}
      </div>
    </Drawer>
  );
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  docked: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  routes: PropTypes.array.isRequired,
};

export default withStyles(styles)(AppDrawer);
