import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import GlobalStyles from '@mui/material/GlobalStyles';
import { styled, alpha } from '@mui/material/styles';
import NProgress from 'nprogress';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import NProgressBar from '@mui/docs/NProgressBar';
import { debounce } from '@mui/material/utils';
import SvgHamburgerMenu from 'docs/src/icons/SvgHamburgerMenu';
import AppNavDrawer from 'docs/src/modules/components/AppNavDrawer';
import AppSettingsDrawer from 'docs/src/modules/components/AppSettingsDrawer';
import Notifications from 'docs/src/modules/components/Notifications';
import MarkdownLinks from 'docs/src/modules/components/MarkdownLinks';
import SkipLink from 'docs/src/modules/components/SkipLink';
import PageContext from 'docs/src/modules/components/PageContext';
import { useTranslate } from '@mui/docs/i18n';
import LogoWithCopyMenu from 'docs/src/components/action/LogoWithCopyMenu';
import AppFrameBanner from 'docs/src/components/banner/AppFrameBanner';

const nProgressStart = debounce(() => {
  NProgress.start();
}, 200);

function nProgressDone() {
  nProgressStart.clear();
  NProgress.done();
}

export function NextNProgressBar() {
  const router = useRouter();
  React.useEffect(() => {
    const handleRouteChangeStart = (url, { shallow }) => {
      if (!shallow) {
        nProgressStart();
      }
    };

    const handleRouteChangeDone = (url, { shallow }) => {
      if (!shallow) {
        nProgressDone();
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeDone);
    router.events.on('routeChangeError', handleRouteChangeDone);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeDone);
      router.events.off('routeChangeError', handleRouteChangeDone);
    };
  }, [router]);

  return <NProgressBar />;
}

const sx = { minWidth: { sm: 160 } };

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
        <React.Suspense fallback={<Box sx={sx} />}>
          <AppSearch sx={sx} />
        </React.Suspense>
      ) : (
        <Box sx={sx} />
      )}
    </React.Fragment>
  );
}

const RootDiv = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    ...theme.applyDarkStyles({
      background: (theme.vars || theme).palette.primaryDark[900],
    }),
    // TODO: Should be handled by the main component
  };
});

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'disablePermanent',
})(({ theme }) => {
  return {
    padding: theme.spacing(1.5),
    transition: theme.transitions.create('width'),
    justifyContent: 'center',
    boxShadow: 'none',
    backdropFilter: 'blur(8px)',
    borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
    backgroundColor: 'hsla(0, 0%, 100%, 0.6)',
    color: (theme.vars || theme).palette.grey[800],
    ...theme.applyDarkStyles({
      backgroundColor: alpha(theme.palette.primaryDark[900], 0.6),
      color: (theme.vars || theme).palette.grey[500],
    }),
    variants: [
      {
        props: ({ disablePermanent }) => disablePermanent,
        style: {
          boxShadow: 'none',
        },
      },
      {
        props: ({ disablePermanent }) => !disablePermanent,
        style: {
          [theme.breakpoints.up('lg')]: {
            width: 'calc(100% - var(--MuiDocs-navDrawer-width))',
          },
        },
      },
    ],
  };
});

const NavIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'disablePermanent',
})(({ theme }) => ({
  variants: [
    {
      props: {
        disablePermanent: false,
      },
      style: {
        [theme.breakpoints.up('lg')]: {
          display: 'none',
        },
      },
    },
  ],
}));

const StyledAppNavDrawer = styled(AppNavDrawer)(({ theme }) => ({
  variants: [
    {
      props: {
        disablePermanent: false,
      },
      style: {
        [theme.breakpoints.up('lg')]: {
          flexShrink: 0,
          width: 'var(--MuiDocs-navDrawer-width)',
        },
      },
    },
  ],
}));

export const HEIGHT = 57;

export default function AppFrame(props) {
  const { children, disableDrawer = false, className, BannerComponent = AppFrameBanner } = props;
  const t = useTranslate();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const closeDrawer = React.useCallback(() => setMobileOpen(false), []);
  const openDrawer = React.useCallback(() => setMobileOpen(true), []);

  const { activePage, productIdentifier } = React.useContext(PageContext);

  const disablePermanent = activePage?.disableDrawer === true || disableDrawer === true;

  return (
    <RootDiv className={className}>
      <NextNProgressBar />
      <CssBaseline />
      <SkipLink />
      <MarkdownLinks />
      <StyledAppBar
        disablePermanent={disablePermanent}
        sx={{ minHeight: 'var(--MuiDocs-header-height)' }}
      >
        <GlobalStyles
          styles={{
            ':root': {
              '--MuiDocs-header-height': `${HEIGHT}px`,
            },
          }}
        />
        <Stack direction="row" sx={{ alignItems: 'center', position: 'relative', width: '100%' }}>
          <NavIconButton
            edge="start"
            color="primary"
            size="small"
            aria-label={t('appFrame.openDrawer')}
            disablePermanent={disablePermanent}
            onClick={() => setMobileOpen(true)}
            sx={{ ml: '1px' }}
          >
            <SvgHamburgerMenu />
          </NavIconButton>
          <Box sx={{ display: { md: 'flex', lg: 'none' } }}>
            <LogoWithCopyMenu
              logo={productIdentifier.logo}
              logoSvgString={productIdentifier.logoSvg}
              wordmarkSvgString={productIdentifier.wordmarkSvg}
              marginLeft
            />
          </Box>
          <Stack direction="row" spacing={1} useFlexGap sx={{ ml: 'auto' }}>
            <BannerComponent />
            <DeferredAppSearch />
            <Tooltip title={t('appFrame.github')} enterDelay={300}>
              <IconButton
                component="a"
                color="primary"
                size="small"
                href={process.env.SOURCE_CODE_REPO}
                data-ga-event-category="header"
                data-ga-event-action="github"
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Notifications />
            <Tooltip title={t('appFrame.toggleSettings')} enterDelay={300}>
              <IconButton color="primary" size="small" onClick={() => setSettingsOpen(true)}>
                <SettingsIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </StyledAppBar>
      <StyledAppNavDrawer
        disablePermanent={disablePermanent}
        onClose={closeDrawer}
        onOpen={openDrawer}
        mobileOpen={mobileOpen}
      />
      {children}
      <AppSettingsDrawer onClose={() => setSettingsOpen(false)} open={settingsOpen} />
    </RootDiv>
  );
}

AppFrame.propTypes = {
  BannerComponent: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disableDrawer: PropTypes.bool,
};
