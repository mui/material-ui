import * as React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { styled, ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import DoneRounded from '@mui/icons-material/DoneRounded';
import SvgMuiLogomark from 'docs/src/icons/SvgMuiLogomark';
import AppNavDrawerItem from 'docs/src/modules/components/AppNavDrawerItem';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import MuiProductSelector from 'docs/src/modules/components/MuiProductSelector';

// TODO: Collapse should expose an API to customize the duration based on the height.
function transitionTheme(theme) {
  return {
    ...theme,
    transitions: {
      ...theme.transitions,
      getAutoHeightDuration: (height) => {
        if (!height) {
          return 0;
        }

        const constant = height / 80;

        // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
        return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
      },
    },
  };
}

const savedScrollTop = {};

function ProductDrawerButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button
        id="mui-product-selector"
        aria-haspopup="true"
        aria-controls={open ? 'drawer-open-button' : undefined}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ArrowDropDownRoundedIcon fontSize="small" sx={{ ml: -0.5 }} />}
        sx={(theme) => ({
          py: 0.1,
          minWidth: 0,
          fontSize: theme.typography.pxToRem(13),
          fontWeight: theme.typography.fontWeightMedium,
          color: (theme.vars || theme).palette.primary[600],
          '& svg': {
            ml: -0.6,
            width: 18,
            height: 18,
          },
          '& > span': {
            ml: '4px',
          },
          ...theme.applyDarkStyles({
            color: (theme.vars || theme).palette.primary[300],
          }),
        })}
      >
        {props.productName}
      </Button>
      <Menu
        id="mui-product-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'mui-product-selector',
        }}
        PaperProps={{
          sx: {
            width: { xs: 340, sm: 'auto' },
          },
        }}
      >
        <MuiProductSelector />
      </Menu>
    </React.Fragment>
  );
}

ProductDrawerButton.propTypes = {
  productName: PropTypes.string,
};

function ProductIdentifier(props) {
  const { name, metadata, versionSelector } = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        sx={(theme) => ({
          ml: 1,
          color: (theme.vars || theme).palette.grey[600],
          fontSize: theme.typography.pxToRem(11),
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.08rem',
        })}
      >
        {metadata}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <ProductDrawerButton productName={name} />
        {versionSelector}
      </Box>
    </Box>
  );
}

ProductIdentifier.propTypes = {
  metadata: PropTypes.string,
  name: PropTypes.string.isRequired,
  versionSelector: PropTypes.element.isRequired,
};

// To match scrollMarginBottom
const browserUrlPreviewMarge = 120;

function PersistScroll(props) {
  const { slot, children, enabled } = props;
  const rootRef = React.useRef();

  useEnhancedEffect(() => {
    const scrollContainer = rootRef.current ? rootRef.current.parentElement : null;
    const activeDrawerLink = scrollContainer.querySelector('.app-drawer-active');

    if (!enabled || !scrollContainer || !activeDrawerLink || !activeDrawerLink.scrollIntoView) {
      return undefined;
    }

    scrollContainer.scrollTop = savedScrollTop[slot];

    const activeBox = activeDrawerLink.getBoundingClientRect();

    if (activeBox.top < 0 || activeBox.bottom + browserUrlPreviewMarge > window.innerHeight) {
      // Scroll the least possible from the initial render, e.g. server-side, scrollTop = 0.
      activeDrawerLink.scrollIntoView({ block: 'nearest' });
    }

    return () => {
      savedScrollTop[slot] = scrollContainer.scrollTop;
    };
  }, [enabled, slot]);

  return <div ref={rootRef}>{children}</div>;
}

PersistScroll.propTypes = {
  children: PropTypes.node.isRequired,
  enabled: PropTypes.bool.isRequired,
  slot: PropTypes.string.isRequired,
};

const ToolbarDiv = styled('div')(({ theme }) => ({
  padding: theme.spacing(1.6, 2),
  paddingRight: 0,
  flexShrink: 0,
  height: 'var(--MuiDocs-header-height)',
  boxSizing: 'border-box', // TODO have CssBaseline in the Next.js layout
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}));

const AppNavPaperComponent = styled('div')(() => {
  return {
    width: 'var(--MuiDocs-navDrawer-width)',
    boxShadow: 'none',
    border: '0 !important', // TODO add a Paper slot
    overflowY: 'unset !important', // TODO add a Paper slot
    boxSizing: 'border-box', // TODO have CssBaseline in the Next.js layout
  };
});

function renderNavItems(options) {
  const { pages, ...params } = options;

  return (
    <List>
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
  const { onClose, activePageParents, items, depth, t } = context;
  const { page } = context;
  if (page.inSideNav === false) {
    return items;
  }

  const title = pageToTitleI18n(page, t);
  if (page.children && page.children.length >= 1) {
    const topLevel =
      activePageParents.map((parentPage) => parentPage.pathname).indexOf(page.pathname) !== -1;

    let firstChild = page.children[0];

    if (firstChild.subheader && firstChild.children) {
      firstChild = firstChild.children[0];
    }

    const subheader = Boolean(page.subheader);
    const [path, hash] = firstChild.pathname.split('#');
    items.push(
      <AppNavDrawerItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        title={title}
        href={{
          pathname: path,
          ...(firstChild.query && { query: firstChild.query }),
          ...(hash && { hash }),
        }}
        legacy={page.legacy}
        newFeature={page.newFeature}
        planned={page.planned}
        plan={page.plan}
        icon={page.icon}
        subheader={subheader}
        topLevel={topLevel && !page.subheader}
        initiallyExpanded={topLevel || subheader}
        expandable={!subheader}
      >
        {renderNavItems({
          onClose,
          pages: page.children,
          activePageParents,
          depth: subheader ? depth : depth + 1,
          t,
        })}
      </AppNavDrawerItem>,
    );
  } else {
    const [path, hash] = page.pathname.split('#');
    items.push(
      <AppNavDrawerItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        title={title}
        href={{
          pathname: path,
          ...(page.query && { query: page.query }),
          ...(hash && { hash }),
        }}
        legacy={page.legacy}
        newFeature={page.newFeature}
        planned={page.planned}
        plan={page.plan}
        icon={page.icon}
        subheader={Boolean(page.subheader)}
        onClick={onClose}
      />,
    );
  }

  return items;
}

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

export default function AppNavDrawer(props) {
  const { className, disablePermanent, mobileOpen, onClose, onOpen } = props;
  const { activePageParents, pages, productIdentifier } = React.useContext(PageContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const t = useTranslate();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const swipeableDrawer = disablePermanent || mobile;

  const drawer = React.useMemo(() => {
    const navItems = renderNavItems({ onClose, pages, activePageParents, depth: 0, t });

    const renderVersionSelector = (versions, sx) => {
      if (!versions?.length) {
        return null;
      }

      const currentVersion = versions.find((version) => version.current) || versions[0];
      return (
        <React.Fragment>
          <Button
            id="mui-version-selector"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
            endIcon={
              versions.length > 1 ? (
                <ArrowDropDownRoundedIcon fontSize="small" sx={{ ml: -0.5 }} />
              ) : null
            }
            sx={[
              (theme) => ({
                py: 0.1,
                minWidth: 0,
                fontSize: theme.typography.pxToRem(13),
                fontWeight: 500,
                color: (theme.vars || theme).palette.primary[600],
                '& svg': {
                  ml: -0.6,
                  width: 18,
                  height: 18,
                },
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primary[300],
                }),
              }),
              ...(Array.isArray(sx) ? sx : [sx]),
            ]}
          >
            {currentVersion.text}
          </Button>
          <Menu
            id="mui-version-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {versions.map((item) => {
              if (item.text === 'View all versions') {
                return [
                  <Divider key="divider" />,
                  <MenuItem key="all-versions" component="a" href={item.href} onClick={onClose}>
                    {/* eslint-disable-next-line material-ui/no-hardcoded-labels -- version string is untranslatable */}
                    {`View all versions`}
                  </MenuItem>,
                ];
              }
              return (
                <MenuItem
                  key={item.text}
                  {...(item.current
                    ? {
                        selected: true,
                        onClick: () => setAnchorEl(null),
                      }
                    : {
                        component: 'a',
                        href: item.href,
                        onClick: onClose,
                      })}
                >
                  {item.text} {item.current && <DoneRounded sx={{ fontSize: 16, ml: 0.25 }} />}
                </MenuItem>
              );
            })}
          </Menu>
        </React.Fragment>
      );
    };

    return (
      <React.Fragment>
        <ToolbarDiv>
          <NextLink href="/" passHref legacyBehavior>
            <Box
              component="a"
              onClick={onClose}
              aria-label={t('goToHome')}
              sx={{
                pr: '12px',
                mr: '4px',
                borderRight: '1px solid',
                borderColor: 'divider',
              }}
            >
              <SvgMuiLogomark width={30} />
            </Box>
          </NextLink>
          <ProductIdentifier
            name={productIdentifier.name}
            metadata={productIdentifier.metadata}
            versionSelector={renderVersionSelector(productIdentifier.versions)}
          />
        </ToolbarDiv>
        <Divider />
        <Box
          sx={{
            pt: 0.5,
            pb: 5,
            overflowY: 'auto',
            flexGrow: 1,
            ...(swipeableDrawer
              ? {}
              : {
                  borderRight: '1px solid',
                  borderColor: 'divider',
                }),
          }}
        >
          <PersistScroll slot="side" enabled>
            {navItems}
          </PersistScroll>
        </Box>
      </React.Fragment>
    );
  }, [onClose, pages, activePageParents, t, productIdentifier, anchorEl, swipeableDrawer]);

  if (process.env.NODE_ENV !== 'production') {
    if (!productIdentifier) {
      throw new Error('docs-infra: missing productIdentifier in PageContext');
    }
    if (!productIdentifier.versions) {
      throw new Error('docs-infra: missing productIdentifier.versions in PageContext');
    }
  }

  return (
    <ThemeProvider theme={transitionTheme}>
      <nav className={className} aria-label={t('mainNavigation')}>
        {swipeableDrawer ? (
          <SwipeableDrawer
            disableBackdropTransition={!iOS}
            variant="temporary"
            open={mobileOpen}
            onOpen={onOpen}
            onClose={onClose}
            ModalProps={{
              keepMounted: true,
            }}
            PaperProps={{
              component: AppNavPaperComponent,
            }}
          >
            {drawer}
          </SwipeableDrawer>
        ) : (
          <StyledDrawer
            variant="permanent"
            PaperProps={{
              component: AppNavPaperComponent,
            }}
            open
          >
            {drawer}
          </StyledDrawer>
        )}
      </nav>
    </ThemeProvider>
  );
}

AppNavDrawer.propTypes = {
  className: PropTypes.string,
  disablePermanent: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};
