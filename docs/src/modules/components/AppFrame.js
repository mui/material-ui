import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import GlobalStyles from '@mui/material/GlobalStyles';
import { styled, alpha } from '@mui/material/styles';
import NProgress from 'nprogress';
import CssBaseline from '@mui/material/CssBaseline';
import MuiLink from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SvgHamburgerMenu from 'docs/src/icons/SvgHamburgerMenu';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import NProgressBar from '@mui/docs/NProgressBar';
import AppNavDrawer from 'docs/src/modules/components/AppNavDrawer';
import AppSettingsDrawer from 'docs/src/modules/components/AppSettingsDrawer';
import Notifications from 'docs/src/modules/components/Notifications';
import MarkdownLinks from 'docs/src/modules/components/MarkdownLinks';
import PageContext from 'docs/src/modules/components/PageContext';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import { debounce } from '@mui/material/utils';
import NextLink from 'next/link';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import AppFrameBanner from 'docs/src/components/banner/AppFrameBanner';

const nProgressStart = debounce(() => {
  NProgress.start();
}, 200);

const nProgressDone = () => {
  nProgressStart.clear();
  NProgress.done();
};

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
        <React.Suspense fallback={<Box sx={{ minWidth: { sm: 200 } }} />}>
          <AppSearch />
        </React.Suspense>
      ) : (
        <Box sx={{ minWidth: { sm: 200 } }} />
      )}
    </React.Fragment>
  );
}

const RootDiv = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    background: theme.palette.mode === 'dark' && theme.palette.primaryDark[900],
    // TODO: Should be handled by the main component
    '& #main-content': {
      outline: 0,
    },
  };
});

const SkipLink = styled(MuiLink)(({ theme }) => {
  return {
    position: 'fixed',
    padding: theme.spacing(1),
    background: theme.palette.background.paper,
    transition: theme.transitions.create('top', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),
    left: theme.spacing(2),
    top: theme.spacing(-10),
    zIndex: theme.zIndex.tooltip + 1,
    '&:focus': {
      top: theme.spacing(2),
      transition: theme.transitions.create('top', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    '@media print': {
      display: 'none',
    },
  };
});

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'disablePermanent',
})(({ disablePermanent, theme }) => {
  return {
    padding: theme.spacing(1, 2),
    transition: theme.transitions.create('width'),
    ...(disablePermanent && {
      boxShadow: 'none',
    }),
    ...(!disablePermanent && {
      [theme.breakpoints.up('lg')]: {
        width: 'calc(100% - var(--MuiDocs-navDrawer-width))',
      },
    }),
    boxShadow: 'none',
    backdropFilter: 'blur(20px)',
    borderStyle: 'solid',
    borderColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary[100], 0.08)
        : theme.palette.grey[100],
    borderWidth: 0,
    borderBottomWidth: 'thin',
    background:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primaryDark[900], 0.7)
        : 'rgba(255,255,255,0.7)',
    color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800],
  };
});

const GrowingDiv = styled('div')({
  flex: '1 1 auto',
});

const NavIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'disablePermanent',
})(({ disablePermanent, theme }) => {
  if (disablePermanent) {
    return {};
  }
  return {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  };
});

const StyledAppNavDrawer = styled(AppNavDrawer)(({ disablePermanent, theme }) => {
  if (disablePermanent) {
    return {};
  }
  return {
    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      width: 'var(--MuiDocs-navDrawer-width)',
    },
  };
});

function AppFrame(props) {
  const { children, disableDrawer = false, className } = props;
  const t = useTranslate();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const { activePage } = React.useContext(PageContext);

  const disablePermanent = activePage?.disableDrawer === true || disableDrawer === true;

  return (
    <RootDiv className={className}>
      <NextNProgressBar />
      <CssBaseline />
      <SkipLink color="secondary" href="#main-content">
        {t('appFrame.skipToContent')}
      </SkipLink>
      <MarkdownLinks />
      <StyledAppBar disablePermanent={disablePermanent}>
        <GlobalStyles
          styles={{
            ':root': {
              '--MuiDocs-header-height': '64px',
            },
          }}
        />
        <Toolbar variant="dense" disableGutters>
          <NavIconButton
            edge="start"
            color="primary"
            aria-label={t('appFrame.openDrawer')}
            disablePermanent={disablePermanent}
            onClick={() => setMobileOpen(true)}
            sx={{ ml: '1px' }}
          >
            <SvgHamburgerMenu />
          </NavIconButton>
          <NextLink href="/" passHref /* onClick={onClose} */>
            <Box
              component="a"
              aria-label={t('goToHome')}
              sx={{ display: { md: 'flex', lg: 'none' }, ml: 2 }}
            >
              <SvgMuiLogo width={30} />
            </Box>
          </NextLink>
          <GrowingDiv />
          <Stack direction="row" spacing={1.3}>
            <AppFrameBanner />
            <DeferredAppSearch />
            <Tooltip title={t('appFrame.github')} enterDelay={300}>
              <IconButton
                component="a"
                color="primary"
                href={process.env.SOURCE_CODE_REPO}
                data-ga-event-category="header"
                data-ga-event-action="github"
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Notifications />
            <Tooltip title={t('appFrame.toggleSettings')} enterDelay={300}>
              <IconButton color="primary" onClick={() => setSettingsOpen(true)} sx={{ px: '8px' }}>
                <SettingsIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </StyledAppBar>
      <StyledAppNavDrawer
        disablePermanent={disablePermanent}
        onClose={() => setMobileOpen(false)}
        onOpen={() => setMobileOpen(true)}
        mobileOpen={mobileOpen}
      />
      {children}
      <AppSettingsDrawer onClose={() => setSettingsOpen(false)} open={settingsOpen} />
    </RootDiv>
  );
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disableDrawer: PropTypes.bool,
};

export default AppFrame;
