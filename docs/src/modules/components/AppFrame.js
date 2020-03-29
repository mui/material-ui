import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { rewriteUrlForNextExport } from 'next/dist/next-server/lib/router/rewrite-url-for-export';
import { withStyles, useTheme } from '@material-ui/core/styles';
import NProgress from 'nprogress';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiLink from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import NoSsr from '@material-ui/core/NoSsr';
import LanguageIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ColorsIcon from '@material-ui/icons/InvertColors';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import GitHubIcon from '@material-ui/icons/GitHub';
import NProgressBar from '@material-ui/docs/NProgressBar';
import FormatTextdirectionLToR from '@material-ui/icons/FormatTextdirectionLToR';
import FormatTextdirectionRToL from '@material-ui/icons/FormatTextdirectionRToL';
import Link from 'docs/src/modules/components/Link';
import AppDrawer from 'docs/src/modules/components/AppDrawer';
import Notifications from 'docs/src/modules/components/Notifications';
import MarkdownLinks from 'docs/src/modules/components/MarkdownLinks';
import { LANGUAGES_LABEL } from 'docs/src/modules/constants';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import { useChangeTheme } from 'docs/src/modules/components/ThemeContext';
import PageContext from 'docs/src/modules/components/PageContext';

const LOCALES = { zh: 'zh-CN', pt: 'pt-BR', es: 'es-ES' };
const CROWDIN_ROOT_URL = 'https://translate.material-ui.com/project/material-ui-docs/';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const AppSearch = React.lazy(() => import('docs/src/modules/components/AppSearch'));
function DeferredAppSearch() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <React.Fragment>
      <link
        rel="preload"
        href="https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css"
        as="style"
      />
      {/* Suspense isn't supported for SSR yet */}
      {mounted ? (
        <React.Suspense fallback={null}>
          <AppSearch />
        </React.Suspense>
      ) : null}
    </React.Fragment>
  );
}

const styles = (theme) => ({
  '@global': {
    '#main-content': {
      outline: 0,
    },
  },
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.level1,
  },
  grow: {
    flex: '1 1 auto',
  },
  skipNav: {
    position: 'fixed',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
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
  },
  appBar: {
    color: theme.palette.type === 'light' ? null : '#fff',
    backgroundColor: theme.palette.type === 'light' ? null : theme.palette.background.level2,
    transition: theme.transitions.create('width'),
  },
  language: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  appBarHome: {
    boxShadow: 'none',
  },
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 240px)',
    },
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      width: 240,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
});

function AppFrame(props) {
  const { children, classes } = props;
  const theme = useTheme();
  const t = useSelector((state) => state.options.t);
  const userLanguage = useSelector((state) => state.options.userLanguage);

  const crowdInLocale = LOCALES[userLanguage] || userLanguage;

  const [languageMenu, setLanguageMenu] = React.useState(null);
  const handleLanguageIconClick = (event) => {
    setLanguageMenu(event.currentTarget);
  };
  const handleLanguageMenuClose = (event) => {
    if (event.currentTarget.nodeName === 'A') {
      document.cookie = `userLanguage=noDefault;path=/;max-age=31536000`;
    }
    setLanguageMenu(null);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const changeTheme = useChangeTheme();
  const handleTogglePaletteType = () => {
    const paletteType = theme.palette.type === 'light' ? 'dark' : 'light';

    changeTheme({ paletteType });
  };
  const handleToggleDirection = () => {
    changeTheme({ direction: theme.direction === 'ltr' ? 'rtl' : 'ltr' });
  };

  const router = useRouter();
  const { canonical } = pathnameToLanguage(rewriteUrlForNextExport(router.asPath));
  const { activePage } = React.useContext(PageContext);

  let disablePermanent = false;
  let navIconClassName = '';
  let appBarClassName = classes.appBar;

  if (!activePage || activePage.disableDrawer === true) {
    disablePermanent = true;
    appBarClassName += ` ${classes.appBarHome}`;
  } else {
    navIconClassName = classes.navIconHide;
    appBarClassName += ` ${classes.appBarShift}`;
  }

  return (
    <div className={classes.root}>
      <NProgressBar />
      <CssBaseline />
      <MuiLink color="secondary" className={classes.skipNav} href="#main-content">
        {t('skipToContent')}
      </MuiLink>
      <MarkdownLinks />
      <AppBar className={appBarClassName}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label={t('openDrawer')}
            onClick={handleDrawerOpen}
            className={navIconClassName}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.grow} />
          <DeferredAppSearch />
          <Tooltip title={t('changeLanguage')} enterDelay={300}>
            <Button
              color="inherit"
              aria-owns={languageMenu ? 'language-menu' : undefined}
              aria-haspopup="true"
              aria-label={t('changeLanguage')}
              onClick={handleLanguageIconClick}
              data-ga-event-category="header"
              data-ga-event-action="language"
            >
              <LanguageIcon />
              <span className={classes.language}>
                {userLanguage === 'aa'
                  ? 'Translating'
                  : LANGUAGES_LABEL.filter((language) => language.code === userLanguage)[0].text}
              </span>
              <ExpandMoreIcon fontSize="small" />
            </Button>
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
                  data-no-link="true"
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
              <Box my={1}>
                <Divider />
              </Box>
              <MenuItem
                component="a"
                data-no-link="true"
                href={
                  userLanguage === 'en' || userLanguage === 'aa'
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
                {`${t('helpToTranslate')}`}
              </MenuItem>
            </Menu>
          </NoSsr>
          <Notifications />
          <Tooltip title={t('editWebsiteColors')} enterDelay={300}>
            <IconButton
              color="inherit"
              aria-label={t('editWebsiteColors')}
              component={Link}
              naked
              href="/customization/color/#color-tool"
              data-ga-event-category="header"
              data-ga-event-action="colors"
            >
              <ColorsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('github')} enterDelay={300}>
            <IconButton
              component="a"
              color="inherit"
              href="https://github.com/mui-org/material-ui"
              aria-label={t('github')}
              data-ga-event-category="header"
              data-ga-event-action="github"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('toggleTheme')} enterDelay={300}>
            <IconButton
              color="inherit"
              onClick={handleTogglePaletteType}
              aria-label={t('toggleTheme')}
              data-ga-event-category="header"
              data-ga-event-action="dark"
            >
              {theme.palette.type === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={t('toggleRTL')} key={theme.direction} enterDelay={300}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleToggleDirection}
              aria-label={t('toggleRTL')}
              data-ga-event-category="header"
              data-ga-event-action="rtl"
            >
              {theme.direction === 'rtl' ? (
                <FormatTextdirectionLToR />
              ) : (
                <FormatTextdirectionRToL />
              )}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <AppDrawer
        className={disablePermanent ? '' : classes.drawer}
        disablePermanent={disablePermanent}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        mobileOpen={mobileOpen}
      />
      {children}
    </div>
  );
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppFrame);
