// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import NProgress from 'nprogress';
import Router from 'next/router';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import LightbulbOutline from 'material-ui-icons/LightbulbOutline';
import Github from 'docs/src/modules/components/Github';
import AppDrawer from 'docs/src/modules/components/AppDrawer';
import AppSearch from 'docs/src/modules/components/AppSearch';
import { pageToTitle } from 'docs/src/modules/utils/helpers';

// Disaply a progress bar between route transitions
NProgress.configure({
  template: `
    <div class="bar" role="bar">
      <dt></dt>
      <dd></dd>
    </div>
  `,
});

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
    },
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        position: 'fixed',
        background: '#000',
        borderRadius: 1,
        zIndex: theme.zIndex.tooltip,
        top: 0,
        left: 0,
        width: '100%',
        height: 2,
      },
      '& dd, & dt': {
        position: 'absolute',
        top: 0,
        height: 2,
        boxShadow: '#000 1px 0 6px 1px',
        borderRadius: '100%',
        animation: 'nprogress-pulse 2s ease-out 0s infinite',
      },
      '& dd': {
        opacity: 0.6,
        width: 20,
        right: 0,
        clip: 'rect(-6px,22px,14px,10px)',
      },
      '& dt': {
        opacity: 0.6,
        width: 180,
        right: -80,
        clip: 'rect(-6px,90px,14px,-6px)',
      },
    },
    '@keyframes nprogress-pulse': {
      '30%': {
        opacity: 0.6,
      },
      '60%': {
        opacity: 0,
      },
      to: {
        opacity: 0.6,
      },
    },
  },
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  grow: {
    flex: '1 1 auto',
  },
  title: {
    marginLeft: 24,
    flex: '0 1 auto',
  },
  appBar: {
    transition: theme.transitions.create('width'),
  },
  appBarHome: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 250px)',
    },
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: 250,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
});

class AppFrame extends React.Component<any, any> {
  state = {
    mobileOpen: false,
  };

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleToggleShade = () => {
    this.props.dispatch({ type: 'TOGGLE_THEME_SHADE' });
  };

  render() {
    const { children, classes } = this.props;
    const title =
      this.context.activePage.title !== false ? pageToTitle(this.context.activePage) : null;

    let disablePermanent = false;
    let navIconClassName = '';
    let appBarClassName = classes.appBar;

    if (title === null) {
      // home route, don't shift app bar or dock drawer
      disablePermanent = true;
      appBarClassName += ` ${classes.appBarHome}`;
    } else {
      navIconClassName += ` ${classes.navIconHide}`;
      appBarClassName += ` ${classes.appBarShift}`;
    }

    return (
      <div className={classes.root}>
        <AppBar className={appBarClassName}>
          <Toolbar>
            <IconButton
              color="contrast"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={navIconClassName}
            >
              <MenuIcon />
            </IconButton>
            {title !== null && (
              <Typography className={classes.title} type="title" color="inherit" noWrap>
                {title}
              </Typography>
            )}
            <div className={classes.grow} />
            <AppSearch />
            <IconButton
              title="Toggle light/dark theme"
              color="contrast"
              aria-label="change theme"
              onClick={this.handleToggleShade}
            >
              <LightbulbOutline />
            </IconButton>
            <IconButton
              component="a"
              title="GitHub"
              color="contrast"
              href="https://github.com/callemall/material-ui/tree/v1-beta"
            >
              <Github />
            </IconButton>
          </Toolbar>
        </AppBar>
        <AppDrawer
          className={classes.drawer}
          disablePermanent={disablePermanent}
          onRequestClose={this.handleDrawerClose}
          mobileOpen={this.state.mobileOpen}
        />
        {children}
      </div>
    );
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

AppFrame.contextTypes = {
  activePage: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

export default compose(
  withStyles(styles, {
    name: 'AppFrame',
  }),
  connect(),
)(AppFrame);
