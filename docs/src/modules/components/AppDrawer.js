import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
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
    marginBottom: theme.spacing.unit / 2,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  // https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
  toolbarIe11: {
    display: 'flex',
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 3,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  anchor: {
    color: theme.palette.text.secondary,
  },
});

// eslint-disable-next-line react/prop-types
function renderNavItems({ pages, ...params }) {
  return (
    <List>
      {pages.reduce(
        // eslint-disable-next-line no-use-before-define
        (items, page) => reduceChildRoutes({ items, page, ...params }),
        [],
      )}
    </List>
  );
}

function reduceChildRoutes({ props, activePage, items, page, depth }) {
  if (page.displayNav === false) {
    return items;
  }

  if (page.children && page.children.length > 1) {
    const title = pageToTitle(page);
    const openImmediately = activePage.pathname.indexOf(page.pathname) === 0;

    items.push(
      <AppDrawerNavItem depth={depth} key={title} openImmediately={openImmediately} title={title}>
        {renderNavItems({ props, pages: page.children, activePage, depth: depth + 1 })}
      </AppDrawerNavItem>,
    );
  } else {
    const title = pageToTitle(page);
    page = page.children && page.children.length === 1 ? page.children[0] : page;

    items.push(
      <AppDrawerNavItem
        depth={depth}
        key={title}
        title={title}
        href={page.pathname}
        onClick={props.onClose}
      />,
    );
  }

  return items;
}

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

function AppDrawer(props, context) {
  const { classes, className, disablePermanent, mobileOpen, onClose, onOpen } = props;

  const drawer = (
    <div className={classes.nav}>
      <div className={classes.toolbarIe11}>
        <div className={classes.toolbar}>
          <Link className={classes.title} href="/" onClick={onClose}>
            <Typography variant="title" color="inherit">
              Material-UI
            </Typography>
          </Link>
          {process.env.LIB_VERSION ? (
            <Link className={classes.anchor} href="/versions">
              <Typography variant="caption">{`v${process.env.LIB_VERSION}`}</Typography>
            </Link>
          ) : null}
        </div>
      </div>
      <Divider />
      {renderNavItems({ props, pages: context.pages, activePage: context.activePage, depth: 0 })}
    </div>
  );

  return (
    <div className={className}>
      <Hidden lgUp={!disablePermanent} implementation="js">
        <SwipeableDrawer
          classes={{
            paper: classNames(classes.paper, 'algolia-drawer'),
          }}
          disableBackdropTransition={!iOS}
          variant="temporary"
          open={mobileOpen}
          onOpen={onOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </SwipeableDrawer>
      </Hidden>
      {disablePermanent ? null : (
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.paper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      )}
    </div>
  );
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  disablePermanent: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

AppDrawer.contextTypes = {
  activePage: PropTypes.object.isRequired,
  pages: PropTypes.array.isRequired,
};

export default withStyles(styles)(AppDrawer);
