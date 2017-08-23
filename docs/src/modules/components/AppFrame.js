// @flow

import * as React from 'react';
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
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import MenuIcon from 'material-ui-icons/Menu';
import LightbulbOutline from 'material-ui-icons/LightbulbOutline';
import Github from 'docs/src/modules/components/Github';
import AppDrawer from 'docs/src/modules/components/AppDrawer';
import AppSearch from 'docs/src/modules/components/AppSearch';
import { pageToTitle } from 'docs/src/modules/utils/helpers';

// Disaply a progress bar between route transitions
NProgress.configure({ showSpinner: false });

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
        background: '#000',
        position: 'fixed',
        zIndex: theme.zIndex.tooltip,
        top: 0,
        left: 0,
        width: '100%',
        height: 2,
      },
      '& .peg': {
        display: 'block',
        position: 'absolute',
        right: 0,
        width: 100,
        height: '100%',
        boxShadow: '0 0 10px #000, 0 0 5px #000',
        opacity: 1,
        transform: 'rotate(3deg) translate(0px, -4px)',
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
  [theme.breakpoints.up('lg')]: {
    drawer: {
      width: 250,
    },
    appBarShift: {
      width: 'calc(100% - 250px)',
    },
    navIconHide: {
      display: 'none',
    },
  },
});

class AppFrame extends React.Component<any, any> {
  static defaultProps: $FlowFixMeProps;
  state = {
    drawerOpen: false,
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleToggleShade = () => {
    this.props.dispatch({ type: 'TOGGLE_THEME_SHADE' });
  };

  render() {
    const { children, classes, width } = this.props;
    const title =
      this.context.activePage.title !== false ? pageToTitle(this.context.activePage) : null;

    let drawerDocked = isWidthUp('lg', width);
    let navIconClassName = '';
    let appBarClassName = classes.appBar;

    if (title === null) {
      // home route, don't shift app bar or dock drawer
      drawerDocked = false;
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
            {title !== null &&
              <Typography className={classes.title} type="title" color="inherit" noWrap>
                {title}
              </Typography>}
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
          docked={drawerDocked}
          onRequestClose={this.handleDrawerClose}
          open={drawerDocked || this.state.drawerOpen}
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
  width: PropTypes.string.isRequired,
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
  withWidth(),
  connect(),
)(AppFrame);
