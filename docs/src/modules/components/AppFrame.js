import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import NProgress from 'nprogress';
import CssBaseline from '@mui/material/CssBaseline';
import MuiLink from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import NProgressBar from '@mui/docs/NProgressBar';
import AppNavDrawer from 'docs/src/modules/components/AppNavDrawer';
import AppSettingsDrawer from 'docs/src/modules/components/AppSettingsDrawer';
import Notifications from 'docs/src/modules/components/Notifications';
import MarkdownLinks from 'docs/src/modules/components/MarkdownLinks';
import { LANGUAGES_LABEL } from 'docs/src/modules/constants';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';
import LanguageIcon from '@mui/icons-material/Translate';

const LOCALES = { zh: 'zh-CN', pt: 'pt-BR', es: 'es-ES' };
const CROWDIN_ROOT_URL = 'https://translate.mui.com/project/material-ui-docs/';

export function NextNProgressBar() {
  const router = useRouter();
  React.useEffect(() => {
    const nProgressStart = () => NProgress.start();
    const nProgressDone = () => NProgress.done();

    router.events.on('routeChangeStart', nProgressStart);
    router.events.on('routeChangeComplete', nProgressDone);
    router.events.on('routeChangeError', nProgressDone);
    return () => {
      router.events.off('routeChangeStart', nProgressStart);
      router.events.off('routeChangeComplete', nProgressDone);
      router.events.off('routeChangeError', nProgressDone);
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
        <React.Suspense fallback={null}>
          <AppSearch />
        </React.Suspense>
      ) : null}
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
    padding: '0 2px',
    transition: theme.transitions.create('width'),
    ...(disablePermanent && {
      boxShadow: 'none',
    }),
    ...(!disablePermanent && {
      [theme.breakpoints.up('lg')]: {
        width: 'calc(100% - 240px)',
      },
    }),
    boxShadow: 'none',
    borderStyle: 'solid',
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[100],
    borderWidth: 0,
    borderBottomWidth: 'thin',
    background: theme.palette.mode === 'dark' ? theme.palette.primaryDark[900] : '#FFF',
    color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[800],
    '& .MuiIconButton-root': {
      border: `1px solid ${
        theme.palette.mode === 'dark' ? theme.palette.primaryDark[600] : theme.palette.grey[200]
      }`,
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.mode === 'dark' ? '#FFF' : theme.palette.primary[500],
      background: theme.palette.mode === 'dark' ? theme.palette.primaryDark[800] : '#FFF',
    },
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
      width: 240,
    },
  };
});

function AppFrame(props) {
  const { children, disableDrawer = false } = props;
  const t = useTranslate();
  const userLanguage = useUserLanguage();

  const crowdInLocale = LOCALES[userLanguage] || userLanguage;

  const [languageMenu, setLanguageMenu] = React.useState(null);
  const handleLanguageIconClick = (event) => {
    setLanguageMenu(event.currentTarget);
  };
  const handleLanguageMenuClose = (event) => {
    if (event.currentTarget.nodeName === 'A') {
      document.cookie = `userLanguage=${event.currentTarget.lang};path=/;max-age=31536000`;
    }
    setLanguageMenu(null);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleNavDrawerOpen = () => {
    setMobileOpen(true);
  };
  const handleNavDrawerClose = React.useCallback(() => {
    setMobileOpen(false);
  }, []);

  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const handleSettingsDrawerOpen = () => {
    setSettingsOpen(true);
  };
  const handleSettingsDrawerClose = React.useCallback(() => {
    setSettingsOpen(false);
  }, []);

  const router = useRouter();
  const { canonical } = pathnameToLanguage(router.asPath);
  const { activePage } = React.useContext(PageContext);

  const disablePermanent = activePage?.disableDrawer === true || disableDrawer === true;

  const languageButtonProps = {
    color: 'inherit',
    onClick: handleLanguageIconClick,
    'aria-owns': languageMenu ? 'language-menu' : undefined,
    'aria-haspopup': 'true',
    'data-ga-event-category': 'header',
    'data-ga-event-action': 'language',
  };

  return (
    <RootDiv>
      <NextNProgressBar />
      <CssBaseline />
      <SkipLink color="secondary" href="#main-content">
        {t('appFrame.skipToContent')}
      </SkipLink>
      <MarkdownLinks />
      <StyledAppBar disablePermanent={disablePermanent}>
        <Toolbar>
          <NavIconButton
            edge="start"
            color="inherit"
            aria-label={t('appFrame.openDrawer')}
            disablePermanent={disablePermanent}
            onClick={handleNavDrawerOpen}
          >
            <MenuIcon />
          </NavIconButton>
          <GrowingDiv />
          <Stack direction="row" spacing={2} sx={{ '& > button': { width: 42 } }}>
            <DeferredAppSearch />
            <Tooltip title={t('appFrame.github')} enterDelay={300}>
              <IconButton
                component="a"
                color="inherit"
                href={process.env.SOURCE_CODE_REPO}
                data-ga-event-category="header"
                data-ga-event-action="github"
                sx={{ px: '10px' }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Notifications />
            <Tooltip title={t('appFrame.changeLanguage')} enterDelay={300}>
              <IconButton
                {...languageButtonProps}
                sx={{
                  px: '10px',
                }}
              >
                <LanguageIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('appFrame.toggleSettings')} enterDelay={300}>
              <IconButton color="inherit" onClick={handleSettingsDrawerOpen} sx={{ px: '10px' }}>
                <SettingsIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <NoSsr defer>
              <Menu
                id="language-menu"
                anchorEl={languageMenu}
                open={Boolean(languageMenu)}
                onClose={handleLanguageMenuClose}
              >
                {LANGUAGES_LABEL.map((language) => (
                  <MenuItem
                    component="a"
                    data-no-markdown-link="true"
                    href={language.code === 'en' ? canonical : `/${language.code}${canonical}`}
                    key={language.code}
                    selected={userLanguage === language.code}
                    onClick={handleLanguageMenuClose}
                    lang={language.code}
                    hrefLang={language.code}
                  >
                    {language.text}
                  </MenuItem>
                ))}
                <Box sx={{ my: 1 }}>
                  <Divider />
                </Box>
                <MenuItem
                  component="a"
                  href={
                    userLanguage === 'en'
                      ? `${CROWDIN_ROOT_URL}`
                      : `${CROWDIN_ROOT_URL}${crowdInLocale}#/staging`
                  }
                  rel="noopener nofollow"
                  target="_blank"
                  key={userLanguage}
                  lang={userLanguage}
                  hrefLang="en"
                  onClick={handleLanguageMenuClose}
                >
                  {t('appFrame.helpToTranslate')}
                </MenuItem>
              </Menu>
            </NoSsr>
          </Stack>
        </Toolbar>
      </StyledAppBar>
      <StyledAppNavDrawer
        disablePermanent={disablePermanent}
        onClose={handleNavDrawerClose}
        onOpen={handleNavDrawerOpen}
        mobileOpen={mobileOpen}
      />
      {children}
      <AppSettingsDrawer onClose={handleSettingsDrawerClose} open={settingsOpen} />
    </RootDiv>
  );
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  disableDrawer: PropTypes.bool,
};

export default AppFrame;
