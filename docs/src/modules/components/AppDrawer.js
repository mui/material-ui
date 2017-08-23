// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import AppDrawerNavItem from 'docs/src/modules/components/AppDrawerNavItem';
import Link from 'docs/src/modules/components/Link';
import { pageToTitle } from 'docs/src/modules/utils/helpers';

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

function renderNavItems(props, pages, activePage) {
  let navItems = null;

  if (pages && pages.length) {
    // eslint-disable-next-line no-use-before-define
    navItems = pages.reduce(reduceChildRoutes.bind(null, props, activePage), []);
  }

  return (
    <List>
      {navItems}
    </List>
  );
}

function reduceChildRoutes(props, activePage, items, childPage, index) {
  if (childPage.children && childPage.children.length > 1) {
    const openImmediately = activePage.pathname.indexOf(childPage.pathname) !== -1 || false;

    items.push(
      <AppDrawerNavItem
        key={index}
        openImmediately={openImmediately}
        title={pageToTitle(childPage)}
      >
        {renderNavItems(props, childPage.children, activePage)}
      </AppDrawerNavItem>,
    );
  } else if (childPage.title !== false) {
    childPage =
      childPage.children && childPage.children.length === 1 ? childPage.children[0] : childPage;

    items.push(
      <AppDrawerNavItem
        key={index}
        title={pageToTitle(childPage)}
        href={childPage.pathname}
        onClick={props.onRequestClose}
      />,
    );
  }

  return items;
}

function AppDrawer(props, context) {
  const { classes, className, docked, onRequestClose } = props;
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
          <Link className={classes.title} href="/" onClick={onRequestClose}>
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
        {renderNavItems(props, context.pages, context.activePage)}
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
};

AppDrawer.contextTypes = {
  pages: PropTypes.array.isRequired,
  activePage: PropTypes.object,
};

export default withStyles(styles)(AppDrawer);
