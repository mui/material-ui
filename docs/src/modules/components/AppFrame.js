/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import NProgress from 'nprogress';
import Router, { Router as Router2, useRouter } from 'next/router';
import { withStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import NoSsr from '@material-ui/core/NoSsr';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import LanguageIcon from '@material-ui/icons/Translate';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MuiLink from '@material-ui/core/Link';
import ColorsIcon from '@material-ui/icons/InvertColors';
import {
  GitHub as GithubIcon,
  LightbulbOutline as LightbulbOutlineIcon,
  LightbulbFull as LightbulbFullIcon,
} from '@material-ui/docs';
import NProgressBar from '@material-ui/docs/NProgressBar';
import FormatTextdirectionLToR from '@material-ui/icons/FormatTextdirectionLToR';
import FormatTextdirectionRToL from '@material-ui/icons/FormatTextdirectionRToL';
import Link from 'docs/src/modules/components/Link';
import AppDrawer from 'docs/src/modules/components/AppDrawer';
import AppSearch from 'docs/src/modules/components/AppSearch';
import Notifications from 'docs/src/modules/components/Notifications';
import MarkdownLinks from 'docs/src/modules/components/MarkdownLinks';
import PageTitle from 'docs/src/modules/components/PageTitle';
import { LANGUAGES } from 'docs/src/modules/constants';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import { useChangeTheme } from 'docs/src/modules/components/ThemeContext';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

export const languages = [
  {
    code: 'en',
    text: '🇺🇸 English',
  },
  {
    code: 'zh',
    text: '🇨🇳 中文',
  },
  {
    code: 'ru',
    text: '🇷🇺 Русский',
  },
  {
    code: 'pt',
    text: '🇧🇷 Português',
  },
  {
    code: 'fr',
    text: '🇫🇷 Français',
  },
  {
    code: 'es',
    text: '🇪🇸 Español',
  },
  {
    code: 'de',
    text: '🇩🇪 Deutsch',
  },
  {
    code: 'ja',
    text: '🇯🇵 日本語',
  },
];

const styles = theme => ({
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
    color: theme.palette.type === 'dark' ? '#fff' : null,
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.level2 : null,
    transition: theme.transitions.create('width'),
    '@media print': {
      position: 'absolute',
    },
  },
  appBarHome: {
    boxShadow: 'none',
  },
  language: {
    margin: theme.spacing(0, 1, 0, 0.5),
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
  '@global': {
    '#main-content': {
      outline: 0,
    },
  },
});

function AppFrame(props) {
  const { children, classes } = props;
  const theme = useTheme();
  const { t, userLanguage } = useSelector(state => ({
    t: state.options.t,
    userLanguage: state.options.userLanguage,
  }));

  const [languageMenu, setLanguageMenu] = React.useState(null);
  function handleLanguageIconClick(event) {
    setLanguageMenu(event.currentTarget);
  }
  function handleLanguageMenuClose(event) {
    if (event.currentTarget.nodeName === 'A') {
      document.cookie = `userLanguage=noDefault;path=/;max-age=31536000`;
    }
    setLanguageMenu(null);
  }

  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerOpen() {
    setMobileOpen(true);
  }
  function handleDrawerClose() {
    setMobileOpen(false);
  }

  const changeTheme = useChangeTheme();
  function handleTogglePaletteType() {
    const paletteType = theme.palette.type === 'light' ? 'dark' : 'light';

    changeTheme({ paletteType });
  }
  function handleToggleDirection() {
    changeTheme({ direction: theme.direction === 'ltr' ? 'rtl' : 'ltr' });
  }

  const router = useRouter();
  const { canonical } = pathnameToLanguage(Router2._rewriteUrlForNextExport(router.asPath));

  return (
    <PageTitle t={t}>
      {title => {
        let disablePermanent = false;
        let navIconClassName = '';
        let appBarClassName = classes.appBar;

        if (title === null) {
          // home route, don't shift app bar or dock drawer
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
            <Notifications />
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
                <AppSearch />
                <Tooltip title="Change language" enterDelay={300}>
                  <IconButton
                    color="inherit"
                    aria-owns={languageMenu ? 'language-menu' : undefined}
                    aria-haspopup="true"
                    aria-label={t('changeLanguage')}
                    onClick={handleLanguageIconClick}
                    data-ga-event-category="AppBar"
                    data-ga-event-action="language"
                  >
                    <LanguageIcon />
                  </IconButton>
                </Tooltip>
                <span className={classes.language}>{userLanguage.toUpperCase()}</span>
                <NoSsr>
                  <Menu
                    id="language-menu"
                    anchorEl={languageMenu}
                    open={Boolean(languageMenu)}
                    onClose={handleLanguageMenuClose}
                  >
                    {languages
                      .filter(language => LANGUAGES.indexOf(language.code) !== -1)
                      .map(language => (
                        <MenuItem
                          component="a"
                          data-no-link="true"
                          href={
                            language.code === 'en' ? canonical : `/${language.code}${canonical}`
                          }
                          key={language.code}
                          selected={userLanguage === language.code}
                          onClick={handleLanguageMenuClose}
                        >
                          {language.text}
                        </MenuItem>
                      ))}
                  </Menu>
                </NoSsr>
                <Tooltip title={t('editWebsiteColors')} enterDelay={300}>
                  <IconButton
                    color="inherit"
                    aria-label={t('editWebsiteColors')}
                    component={Link}
                    naked
                    href="/customization/color/#color-tool"
                    data-ga-event-category="AppBar"
                    data-ga-event-action="colors"
                  >
                    <ColorsIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('toggleTheme')} enterDelay={300}>
                  <IconButton
                    color="inherit"
                    onClick={handleTogglePaletteType}
                    aria-label={t('toggleTheme')}
                    data-ga-event-category="AppBar"
                    data-ga-event-action="dark"
                  >
                    {theme.palette.type === 'light' ? (
                      <LightbulbOutlineIcon />
                    ) : (
                      <LightbulbFullIcon />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('toggleRTL')} enterDelay={300}>
                  <IconButton
                    color="inherit"
                    onClick={handleToggleDirection}
                    aria-label={t('toggleRTL')}
                    data-ga-event-category="AppBar"
                    data-ga-event-action="rtl"
                  >
                    {theme.direction === 'rtl' ? (
                      <FormatTextdirectionLToR />
                    ) : (
                      <FormatTextdirectionRToL />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('github')} enterDelay={300}>
                  <IconButton
                    edge="end"
                    component="a"
                    color="inherit"
                    href="https://github.com/mui-org/material-ui"
                    aria-label={t('github')}
                    data-ga-event-category="AppBar"
                    data-ga-event-action="github"
                  >
                    <GithubIcon />
                  </IconButton>
                </Tooltip>
              </Toolbar>
            </AppBar>
            <AppDrawer
              className={classes.drawer}
              disablePermanent={disablePermanent}
              onClose={handleDrawerClose}
              onOpen={handleDrawerOpen}
              mobileOpen={mobileOpen}
            />
            {children}
          </div>
        );
      }}
    </PageTitle>
  );
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppFrame);
