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
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import DoneRounded from '@mui/icons-material/DoneRounded';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import IconImage from 'docs/src/components/icon/IconImage';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import materialPkgJson from '../../../../packages/mui-material/package.json';
import basePkgJson from '../../../../packages/mui-base/package.json';
import systemPkgJson from '../../../../packages/mui-system/package.json';

const savedScrollTop = {};

const LinksWrapper = styled('div')(({ theme }) => {
  return {
    paddingLeft: theme.spacing(5.5),
    paddingTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    '& > a': {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(14),
      color:
        theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.primaryDark[700], 0.4)
            : theme.palette.grey[50],
      },
      '& svg': {
        width: 18,
        height: 18,
      },
    },
  };
});

function ProductSubMenu(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
      }}
    >
      <Box
        sx={{
          '& circle': {
            fill: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[700]
                : theme.palette.grey[100],
          },
        }}
      >
        {props.icon}
      </Box>
      <div>
        <Typography color="text.primary" variant="body2" fontWeight="700">
          {props.name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {props.description}
        </Typography>
      </div>
    </Box>
  );
}

ProductSubMenu.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.element,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

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
    <div>
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
          fontWeight: 500,
          lineHeight: 0,
          color:
            theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
          '& svg': {
            ml: -0.6,
            width: 18,
            height: 18,
          },
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
            width: { xs: 310, sm: 360 },
            overflow: 'hidden',
            borderRadius: '10px',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'primaryDark.900' : 'background.paper',
            boxShadow: (theme) =>
              `0px 4px 20px ${
                theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(170, 180, 190, 0.3)'
              }`,
            '& ul': {
              margin: 0,
              padding: 0,
              listStyle: 'none',
            },
            '& li:not(:last-of-type)': {
              borderBottom: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary[100], 0.08)
                  : theme.palette.grey[100],
            },
            '& a': { textDecoration: 'none' },
            '& li': {
              p: 2,
            },
          },
        }}
      >
        <li role="none">
          <ProductSubMenu
            role="menuitem"
            icon={<IconImage name="product-core" />}
            name="MUI Core"
            description="Ready-to-use foundational components, free forever."
          />
          <LinksWrapper>
            {FEATURE_TOGGLE.enable_mui_base_scope && (
              <Link
                href={ROUTES.baseDocs}
                // eslint-disable-next-line material-ui/no-hardcoded-labels
              >
                Base <KeyboardArrowRight fontSize="small" />
              </Link>
            )}
            <Link
              href={ROUTES.materialDocs}
              // eslint-disable-next-line material-ui/no-hardcoded-labels
            >
              Material UI <KeyboardArrowRight fontSize="small" />
            </Link>
            <Link
              href={ROUTES.systemDocs}
              // eslint-disable-next-line material-ui/no-hardcoded-labels
            >
              MUI System <KeyboardArrowRight fontSize="small" />
            </Link>
          </LinksWrapper>
        </li>
        <li role="none">
          <ProductSubMenu
            role="menuitem"
            icon={<IconImage name="product-advanced" />}
            name={
              <Box
                component="span"
                display="inline-flex"
                alignItems="center"
                // eslint-disable-next-line material-ui/no-hardcoded-labels
              >
                MUI&nbsp;X
              </Box>
            }
            description="Advanced and powerful components for complex use-cases."
          />
          <LinksWrapper>
            <Link
              href={ROUTES.dataGridDocs}
              // eslint-disable-next-line material-ui/no-hardcoded-labels
            >
              Data Grid <KeyboardArrowRight fontSize="small" />
            </Link>
          </LinksWrapper>
        </li>
      </Menu>
    </div>
  );
}

ProductDrawerButton.propTypes = {
  productName: PropTypes.string,
};

const ProductIdentifier = ({ name, metadata, versionSelector }) => (
  <Box
    sx={{
      width: '100%',
      display: 'flex',
      flex: 'auto',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <Typography
        sx={(theme) => ({
          ml: 1,
          color: theme.palette.grey[600],
          fontSize: theme.typography.pxToRem(11),
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.08rem',
        })}
      >
        {metadata}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'end',
        }}
      >
        <ProductDrawerButton productName={name} />
        {versionSelector}
      </Box>
    </div>
  </Box>
);

ProductIdentifier.propTypes = {
  metadata: PropTypes.string,
  name: PropTypes.string,
  versionSelector: PropTypes.element,
};

const AppSearch = React.lazy(() => import('docs/src/modules/components/AppSearch'));
export function DeferredAppSearch() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <React.Fragment>
      {/* Suspense isn't supported for SSR yet */}
      {mounted ? (
        <React.Suspense fallback={null}>
          <AppSearch />
        </React.Suspense>
      ) : null}
    </React.Fragment>
  );
}

function PersistScroll(props) {
  const { slot, children, enabled } = props;
  const rootRef = React.useRef();

  useEnhancedEffect(() => {
    const parent = rootRef.current ? rootRef.current.parentElement : null;
    const activeElement = parent.querySelector('.app-drawer-active');

    if (!enabled || !parent || !activeElement || !activeElement.scrollIntoView) {
      return undefined;
    }

    parent.scrollTop = savedScrollTop[slot];

    const activeBox = activeElement.getBoundingClientRect();

    if (activeBox.top < 0 || activeBox.top > window.innerHeight) {
      parent.scrollTop += activeBox.top - 8 - 32;
    }

    return () => {
      savedScrollTop[slot] = parent.scrollTop;
    };
  }, [enabled, slot]);

  return <div ref={rootRef}>{children}</div>;
}

PersistScroll.propTypes = {
  children: PropTypes.node.isRequired,
  enabled: PropTypes.bool.isRequired,
  slot: PropTypes.string.isRequired,
};

// https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
const ToolbarIE11 = styled('div')({ display: 'flex' });

const ToolbarDiv = styled('div')(({ theme }) => {
  return {
    padding: theme.spacing(1.45, 2),
    height: 64,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
});

const StyledDrawer = styled(Drawer)(({ theme }) => {
  return {
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  };
});

const SwipeableDrawerPaperComponent = styled('div')(({ theme }) => {
  return {
    width: 280,
    boxShadow: 'none',
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
  const { onClose, activePage, items, depth, t } = context;
  let { page } = context;
  if (page.ordered === false) {
    return items;
  }

  if (page.children && page.children.length > 1) {
    const title = pageToTitleI18n(page, t);
    const topLevel = activePage
      ? activePage.pathname.indexOf(`${page.pathname}`) === 0 ||
        page.scopePathnames?.some((pathname) => activePage.pathname.includes(pathname))
      : false;

    items.push(
      <AppNavDrawerItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        topLevel={topLevel && !page.subheader}
        openImmediately={topLevel || Boolean(page.subheader)}
        title={title}
        icon={page.icon}
      >
        {renderNavItems({ onClose, pages: page.children, activePage, depth: depth + 1, t })}
      </AppNavDrawerItem>,
    );
  } else {
    const title = pageToTitleI18n(page, t);
    page = page.children && page.children.length === 1 ? page.children[0] : page;

    items.push(
      <AppNavDrawerItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        title={title}
        href={page.pathname}
        onClick={onClose}
        icon={page.icon}
      />,
    );
  }

  return items;
}

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

function AppNavDrawer(props) {
  const { className, disablePermanent, mobileOpen, onClose, onOpen } = props;
  const { activePage, pages } = React.useContext(PageContext);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userLanguage = useUserLanguage();
  const languagePrefix = userLanguage === 'en' ? '' : `/${userLanguage}`;
  const t = useTranslate();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const drawer = React.useMemo(() => {
    const isProductScoped =
      router.asPath.startsWith('/x') ||
      router.asPath.startsWith('/material') ||
      (router.asPath.startsWith('/system') && FEATURE_TOGGLE.enable_system_scope) ||
      router.asPath.startsWith('/base');

    const navItems = renderNavItems({ onClose, pages, activePage, depth: 0, t });

    const renderVersionSelector = (versions = []) => {
      if (!versions?.length) {
        return null;
      }
      return (
        <React.Fragment>
          <Button
            id="mui-version-selector"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
            endIcon={<ArrowDropDownRoundedIcon fontSize="small" sx={{ ml: -0.5 }} />}
            sx={(theme) => ({
              py: 0.1,
              minWidth: 0,
              fontSize: theme.typography.pxToRem(13),
              fontWeight: 500,
              lineHeight: 0,
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary[300]
                  : theme.palette.primary[600],
              '& svg': {
                ml: -0.6,
                width: 18,
                height: 18,
              },
              ...(!isProductScoped && {
                px: 1,
                py: 0.4,
                border: `1px solid ${
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[700]
                    : theme.palette.grey[200]
                }`,
                '&:hover': {
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[600]
                      : theme.palette.grey[300],
                  background:
                    theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primaryDark[700], 0.4)
                      : theme.palette.grey[50],
                },
              }),
            })}
          >
            {versions[0].text}
          </Button>
          <Menu
            id="mui-version-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {versions.map((item) => (
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
            ))}
            {versions.length > 1 && [
              <Divider key="divider" />,
              <MenuItem
                key="all-versions"
                component="a"
                href={`https://mui.com${languagePrefix}/versions/`}
                onClick={onClose}
              >
                {/* eslint-disable-next-line material-ui/no-hardcoded-labels -- version string is untranslatable */}
                {`View all versions`}
              </MenuItem>,
            ]}
          </Menu>
        </React.Fragment>
      );
    };

    return (
      <React.Fragment>
        <ToolbarIE11>
          <ToolbarDiv>
            <NextLink href="/" passHref onClick={onClose}>
              <Box
                component="a"
                aria-label={t('goToHome')}
                sx={{
                  pr: 2,
                  mr: 1,
                  borderRight: isProductScoped ? '1px solid' : '0px',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary[100], 0.08)
                      : theme.palette.grey[200],
                }}
              >
                <SvgMuiLogo width={30} />
              </Box>
            </NextLink>
            {!isProductScoped &&
              renderVersionSelector([
                { text: `v${process.env.LIB_VERSION}`, current: true },
                { text: 'v4', href: `https://v4.mui.com${languagePrefix}/` },
              ])}
            {router.asPath.startsWith('/material/') && (
              <ProductIdentifier
                name="Material UI"
                metadata="MUI Core"
                versionSelector={renderVersionSelector([
                  { text: `v${materialPkgJson.version}`, current: true },
                  {
                    text: 'v4',
                    href: `https://v4.mui.com${languagePrefix}/getting-started/installation/`,
                  },
                ])}
              />
            )}
            {router.asPath.startsWith('/system/') && FEATURE_TOGGLE.enable_system_scope && (
              <ProductIdentifier
                name="MUI System"
                metadata="MUI Core"
                versionSelector={renderVersionSelector([
                  { text: `v${systemPkgJson.version}`, current: true },
                  { text: 'v4', href: `https://v4.mui.com${languagePrefix}/system/basics/` },
                ])}
              />
            )}
            {router.asPath.startsWith('/base/') && (
              <ProductIdentifier
                name="Base"
                metadata="MUI Core"
                versionSelector={renderVersionSelector([
                  { text: `v${basePkgJson.version}`, current: true },
                ])}
              />
            )}
            {(router.asPath.startsWith('/x/react-data-grid') ||
              router.asPath.startsWith('/x/api/data-grid')) && (
              <ProductIdentifier
                name="Data Grid"
                metadata="MUI X"
                versionSelector={renderVersionSelector([
                  // LIB_VERSION is set from the X repo
                  { text: `v${process.env.LIB_VERSION}`, current: true },
                  { text: 'v4', href: `https://v4.mui.com${languagePrefix}/components/data-grid/` },
                ])}
              />
            )}
          </ToolbarDiv>
        </ToolbarIE11>
        <Divider
          sx={{
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.primary[100], 0.08)
                : theme.palette.grey[100],
          }}
        />
        <DiamondSponsors spot="drawer" />
        {navItems}
        <Box sx={{ height: 40 }} />
      </React.Fragment>
    );
  }, [activePage, pages, onClose, languagePrefix, t, anchorEl, setAnchorEl, router.asPath]);

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
            component: SwipeableDrawerPaperComponent,
            sx: {
              background: (theme) =>
                theme.palette.mode === 'dark' ? theme.palette.primaryDark[900] : '#FFF',
            },
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
            component: SwipeableDrawerPaperComponent,
            sx: {
              background: (theme) =>
                theme.palette.mode === 'dark' ? theme.palette.primaryDark[900] : '#fff',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary[100], 0.08)
                  : theme.palette.grey[100],
            },
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

export default AppNavDrawer;
