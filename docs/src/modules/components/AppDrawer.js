import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import DiamondSponsors from 'docs/src/modules/components/DiamondSponsors';
import AppDrawerNavItem from 'docs/src/modules/components/AppDrawerNavItem';
import Link from 'docs/src/modules/components/Link';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';

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

// Annotiate it with the subsection it is in, if matched
function annotateItem(item, subheader) {
  if (
    ['/components/data-grid', '/components/lab', '/components/pickers'].some(
      (section) => section === subheader,
    )
  ) {
    item.prefix = subheader;
  }
  return item;
}

// Remove component subsections
function flattenPages(pages, current = [], subheader) {
  return pages.reduce((items, item) => {
    if (
      item.children &&
      item.children.length > 1 &&
      item.subheader &&
      item.subheader.startsWith('/components')
    ) {
      items = flattenPages(item.children, items, subheader || item.subheader);
    } else {
      items.push(
        item.children && item.children.length === 1
          ? item.children[0]
          : annotateItem(item, subheader),
      );
    }
    return items;
  }, current);
}

// Sort by component name
function byComponentName(a, b) {
  const sectionA = a.prefix && a.prefix.split('/')[2];
  const sectionB = b.prefix && b.prefix.split('/')[2];
  const componentA = a.pathname.split('/')[2];
  const componentB = b.pathname.split('/')[2];
  const pageA = sectionA ? sectionA + componentA : componentA;
  const pageB = sectionB ? sectionB + componentB : componentB;

  let comparison = 0;
  if (pageA > pageB) {
    comparison = 1;
  } else if (pageA < pageB) {
    comparison = -1;
  }
  return comparison;
}

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

/**
 * @param {object} context
 * @param {import('docs/src/pages').MuiPage} context.page
 */
function reduceChildRoutes(context) {
  const { onClose, activePage, items, inputRef, depth, t, searchString, setSearchString } = context;

  let { page } = context;

  if (page.displayNav === false) {
    return items;
  }

  const handleInputChange = (event) => {
    setSearchString(event.target.value);
  };

  if (page.pathname === '/components' || (page.children && page.children.length > 1)) {
    const title = pageToTitleI18n(page, t);
    const topLevel = activePage ? activePage.pathname.indexOf(`${page.pathname}/`) === 0 : false;

    items.push(
      <AppDrawerNavItem
        linkProps={page.linkProps}
        depth={depth}
        key={page.subheader ? page.subheader : page.pathname}
        topLevel={topLevel && !page.subheader}
        openImmediately={topLevel || Boolean(page.subheader)}
        title={title}
      >
        {page.pathname === '/components' && depth === 0 && (
          <TextField
            type="search"
            size="small"
            onChange={handleInputChange}
            value={searchString}
            placeholder="Filter (f)"
            style={{ marginLeft: 24, fontSize: 14 }}
            inputRef={inputRef}
          />
        )}
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
  const inputRef = React.useRef();
  const [searchString, setSearchString] = React.useState('');
  const [filteredPages, setFilteredPages] = React.useState(pages);
  const userLanguage = useUserLanguage();
  const languagePrefix = userLanguage === 'en' ? '' : `/${userLanguage}`;
  const t = useTranslate();

  React.useEffect(() => {
    const newPages = JSON.parse(JSON.stringify(pages));

    if (searchString !== '') {
      newPages[1].children = flattenPages(pages[1].children)
        .filter(
          (page) =>
            page.pathname
              .replace(/\/.*?\//, '') // Remove leading `/components/`
              .replace('-', ' ')
              .indexOf(searchString.toLowerCase()) !== -1,
        )
        .sort(byComponentName);
    }

    setFilteredPages(newPages);
  }, [pages, setFilteredPages, searchString]);

  React.useEffect(() => {
    const handleKeyDown = (nativeEvent) => {
      if (
        nativeEvent.key === 'f' &&
        ['BUTTON', 'BODY', 'MAIN'].some((element) => element === document.activeElement.nodeName) &&
        inputRef.current &&
        document.activeElement !== inputRef.current
      ) {
        nativeEvent.preventDefault();
        inputRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navItems = React.useMemo(
    () =>
      renderNavItems({
        activePage,
        depth: 0,
        inputRef,
        onClose,
        pages: filteredPages,
        searchString,
        setSearchString,
        t,
      }),
    [activePage, inputRef, filteredPages, onClose, searchString, t],
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
      <Box sx={{ mx: 3, my: 2 }}>
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
