import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import DiamondSponsors from 'docs/src/modules/components/DiamondSponsors';
import AppDrawerNavItem from 'docs/src/modules/components/AppDrawerNavItem';
import Link from 'docs/src/modules/components/Link';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';

let savedScrollTop = null;
function PersistScroll(props) {
  const { children } = props;
  const rootRef = React.useRef();

  React.useEffect(() => {
    const parent = rootRef.current ? rootRef.current.parentElement : null;
    const activeElement = document.querySelector('.app-drawer-active');

    if (!parent || !activeElement || !activeElement.scrollIntoView) {
      return undefined;
    }

    const activeBox = activeElement.getBoundingClientRect();

    if (savedScrollTop === null || activeBox.top - savedScrollTop < 0) {
      // Center the selected item in the list container.
      activeElement.scrollIntoView();
      // Fix a Chrome issue, reset the tabbable ring back to the top of the document.
      document.body.scrollIntoView();
    } else {
      parent.scrollTop = savedScrollTop;
    }

    return () => {
      savedScrollTop = parent.scrollTop;
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}

PersistScroll.propTypes = {
  children: PropTypes.node,
};

const styles = (theme) => ({
  paper: {
    width: 240,
    backgroundColor: theme.palette.background.level1,
  },
  title: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
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
    paddingLeft: theme.spacing(3),
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

function renderNavItems(options) {
  const { pages, ...params } = options;

  return (
    <List disablePadding>
      {pages.reduce(
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        (items, page) => reduceChildRoutes({ items, page, ...params }),
        [],
      )}
    </List>
  );
}

function reduceChildRoutes({ onClose, activePage, items, page, depth, t }) {
  if (page.displayNav === false) {
    return items;
  }

  if (page.children && page.children.length > 1) {
    const title = pageToTitleI18n(page, t);
    const topLevel = activePage ? activePage.pathname.indexOf(`${page.pathname}/`) === 0 : false;

    items.push(
      <AppDrawerNavItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        topLevel={topLevel && !page.subheader}
        openImmediately={topLevel || Boolean(page.subheader)}
        title={title}
      >
        {renderNavItems({ onClose, pages: page.children, activePage, depth: depth + 1, t })}
      </AppDrawerNavItem>,
    );
  } else {
    const title = pageToTitleI18n(page, t);
    page = page.children && page.children.length === 1 ? page.children[0] : page;

    items.push(
      <AppDrawerNavItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        title={title}
        href={page.pathname}
        onClick={onClose}
      />,
    );
  }

  return items;
}

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

function AppDrawer(props) {
  const { classes, className, disablePermanent, mobileOpen, onClose, onOpen } = props;
  const { activePage, pages } = React.useContext(PageContext);
  const userLanguage = useSelector((state) => state.options.userLanguage);
  const languagePrefix = userLanguage === 'en' ? '' : `/${userLanguage}`;
  const t = useSelector((state) => state.options.t);

  const navItems = React.useMemo(
    () => renderNavItems({ onClose, pages, activePage, depth: 0, t }),
    [activePage, pages, onClose, t],
  );
  const drawer = (
    <PersistScroll>
      <div className={classes.toolbarIe11}>
        <div className={classes.toolbar}>
          <Link className={classes.title} href="/" onClick={onClose} variant="h6" color="inherit">
            Material-UI
          </Link>
          {process.env.LIB_VERSION ? (
            <Link
              color="textSecondary"
              variant="caption"
              href={`https://material-ui.com${languagePrefix}/versions/`}
              onClick={onClose}
            >
              {/* eslint-disable-next-line material-ui/no-hardcoded-labels -- version string is untranslatable */}
              {`v${process.env.LIB_VERSION}`}
            </Link>
          ) : null}
        </div>
      </div>
      <Divider />
      <Box mx={3} my={2}>
        <DiamondSponsors spot="drawer" />
      </Box>
      {navItems}
    </PersistScroll>
  );

  return (
    <nav className={className} aria-label={t('mainNavigation')}>
      <Hidden lgUp={!disablePermanent} implementation="js">
        <SwipeableDrawer
          classes={{
            paper: clsx(classes.paper, 'algolia-drawer'),
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
        <Hidden lgDown implementation="css">
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
    </nav>
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

export default withStyles(styles)(AppDrawer);
