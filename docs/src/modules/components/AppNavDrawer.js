import * as React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { styled, alpha } from '@mui/material/styles';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import DiamondSponsors from 'docs/src/modules/components/DiamondSponsors';
import AppNavDrawerItem from 'docs/src/modules/components/AppNavDrawerItem';
import { pathnameToLanguage, pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import DoneRounded from '@mui/icons-material/DoneRounded';
import MuiProductSelector from 'docs/src/modules/components/MuiProductSelector';
import materialPkgJson from '../../../../packages/mui-material/package.json';
import joyPkgJson from '../../../../packages/mui-joy/package.json';
import basePkgJson from '../../../../packages/mui-base/package.json';
import systemPkgJson from '../../../../packages/mui-system/package.json';

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
        aria-controls="drawer-open-button"
        aria-haspopup="true"
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

function ProductIdentifier({ name, metadata, versionSelector }) {
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
  name: PropTypes.string,
  versionSelector: PropTypes.element,
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
  padding: theme.spacing(1.45, 2),
  paddingRight: 0,
  height: 'var(--MuiDocs-header-height)',
  boxSizing: 'border-box', // TODO have CssBaseline in the Next.js layout
  display: 'flex',
  flexGrow: 1,
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

const AppNavPaperComponent = styled('div')(({ theme }) => {
  return {
    width: 'var(--MuiDocs-navDrawer-width)',
    boxShadow: 'none',
    boxSizing: 'border-box', // TODO have CssBaseline in the Next.js layout
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up('xs')]: {
      borderRadius: '0px 10px 10px 0px',
    },
    [theme.breakpoints.up('sm')]: {
      borderRadius: '0px',
    },
  };
});

function renderNavItems(options) {
  const { pages, ...params } = options;

  return (
    <List sx={{ my: 0.5 }}>
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
  let { page } = context;
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
        comingSoon={page.comingSoon}
        plan={page.plan}
        icon={page.icon}
        subheader={subheader}
        topLevel={topLevel && !page.subheader}
        openImmediately={topLevel || subheader}
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
    page = page.children && page.children.length === 1 ? page.children[0] : page;
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
        comingSoon={page.comingSoon}
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
  const { activePageParents, pages } = React.useContext(PageContext);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userLanguage = useUserLanguage();
  const languagePrefix = userLanguage === 'en' ? '' : `/${userLanguage}`;
  const t = useTranslate();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const drawer = React.useMemo(() => {
    const { canonicalAs } = pathnameToLanguage(router.asPath);

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
              sx={(theme) => ({
                pr: '12px',
                mr: '4px',
                borderRight: '1px solid',
                borderColor: (theme.vars || theme).palette.grey[200],
                ...theme.applyDarkStyles({
                  borderColor: alpha(theme.palette.primary[100], 0.08),
                }),
              })}
            >
              <SvgMuiLogo width={30} />
            </Box>
          </NextLink>
          {canonicalAs.startsWith('/material-ui/') && (
            <ProductIdentifier
              name="Material UI"
              metadata="MUI Core"
              versionSelector={renderVersionSelector([
                { text: `v${materialPkgJson.version}`, current: true },
                {
                  text: 'v4',
                  href: `https://v4.mui.com${languagePrefix}/getting-started/installation/`,
                },
                {
                  text: 'View all versions',
                  href: `https://mui.com${languagePrefix}/versions/`,
                },
              ])}
            />
          )}
          {canonicalAs.startsWith('/joy-ui/') && (
            <ProductIdentifier
              name="Joy UI"
              metadata="MUI Core"
              versionSelector={renderVersionSelector([
                { text: `v${joyPkgJson.version}`, current: true },
              ])}
            />
          )}
          {canonicalAs.startsWith('/system/') && (
            <ProductIdentifier
              name="MUI System"
              metadata="MUI Core"
              versionSelector={renderVersionSelector([
                { text: `v${systemPkgJson.version}`, current: true },
                { text: 'v4', href: `https://v4.mui.com${languagePrefix}/system/basics/` },
                {
                  text: 'View all versions',
                  href: `https://mui.com${languagePrefix}/versions/`,
                },
              ])}
            />
          )}
          {canonicalAs.startsWith('/base/') && (
            <ProductIdentifier
              name="Base UI"
              metadata="MUI Core"
              versionSelector={renderVersionSelector([
                { text: `v${basePkgJson.version}`, current: true },
              ])}
            />
          )}
          {canonicalAs.startsWith('/x/introduction/') && (
            <ProductIdentifier name="Advanced components" metadata="MUI X" />
          )}
          {(canonicalAs.startsWith('/x/react-data-grid/') ||
            canonicalAs.startsWith('/x/api/data-grid/')) && (
            <ProductIdentifier
              name="Data Grid"
              metadata="MUI X"
              versionSelector={renderVersionSelector([
                // DATA_GRID_VERSION is set from the X repo
                {
                  text: 'v6',
                  ...(process.env.DATA_GRID_VERSION.startsWith('6')
                    ? {
                        text: `v${process.env.DATA_GRID_VERSION}`,
                        current: true,
                      }
                    : {
                        href: `https://mui.com${languagePrefix}/components/data-grid/`,
                      }),
                },
                {
                  text: 'v5',
                  ...(process.env.DATA_GRID_VERSION.startsWith('5')
                    ? {
                        text: `v${process.env.DATA_GRID_VERSION}`,
                        current: true,
                      }
                    : {
                        href: `https://v5.mui.com${languagePrefix}/components/data-grid/`,
                      }),
                },
                { text: 'v4', href: `https://v4.mui.com${languagePrefix}/components/data-grid/` },
              ])}
            />
          )}
          {(canonicalAs.startsWith('/x/react-date-pickers/') ||
            canonicalAs.startsWith('/x/api/date-pickers/')) && (
            <ProductIdentifier
              name="Date pickers"
              metadata="MUI X"
              versionSelector={renderVersionSelector([
                // DATE_PICKERS_VERSION is set from the X repo
                {
                  ...(process.env.DATE_PICKERS_VERSION.startsWith('6')
                    ? {
                        text: `v${process.env.DATE_PICKERS_VERSION}`,
                        current: true,
                      }
                    : {
                        text: `v6`,
                        href: `https://next.mui.com${languagePrefix}/components/data-grid/`,
                      }),
                },
                {
                  ...(process.env.DATE_PICKERS_VERSION.startsWith('5')
                    ? {
                        text: `v${process.env.DATE_PICKERS_VERSION}`,
                        current: true,
                      }
                    : {
                        text: `v5`,
                        href: `https://v5.mui.com${languagePrefix}/components/data-grid/`,
                      }),
                },
              ])}
            />
          )}
          {canonicalAs.startsWith('/toolpad/') && (
            <ProductIdentifier name="Toolpad" metadata="MUI Toolpad" />
          )}
        </ToolbarDiv>
        <Divider
          sx={(theme) => ({
            borderColor: (theme.vars || theme).palette.grey[100],
            ...theme.applyDarkStyles({
              borderColor: alpha(theme.palette.primary[100], 0.08),
            }),
          })}
        />
        <DiamondSponsors />
        {navItems}
      </React.Fragment>
    );
  }, [activePageParents, pages, onClose, languagePrefix, t, anchorEl, setAnchorEl, router.asPath]);

  return (
    <nav className={className} aria-label={t('mainNavigation')}>
      {disablePermanent || mobile ? (
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
            className: 'algolia-drawer',
            component: AppNavPaperComponent,
          }}
        >
          <PersistScroll slot="swipeable" enabled={mobileOpen}>
            {drawer}
          </PersistScroll>
        </SwipeableDrawer>
      ) : null}
      {disablePermanent || mobile ? null : (
        <StyledDrawer
          variant="permanent"
          PaperProps={{
            component: AppNavPaperComponent,
          }}
          open
        >
          <PersistScroll slot="side" enabled>
            {drawer}
          </PersistScroll>
        </StyledDrawer>
      )}
    </nav>
  );
}

AppNavDrawer.propTypes = {
  className: PropTypes.string,
  disablePermanent: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};
