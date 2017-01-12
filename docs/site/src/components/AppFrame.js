// @flow weak

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { createStyleSheet } from 'jss-theme-reactor';
import Text from 'material-ui/Text';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import MenuIcon from 'material-ui-icons/Menu';
import LightbulbOutlineIcon from 'material-ui-icons/LightbulbOutline';
import PlayCircleOutlineIcon from 'material-ui/svg-icons/play-circle-outline';
import customPropTypes from 'material-ui/utils/customPropTypes';
import AppDrawer from './AppDrawer';
import ApiMenu from './ApiMenu';
import { componentMap, demoPaths } from './api-menu-data.js';
import { apiMenuData } from './api-menu-data.js';

function getTitle(routes) {
  for (let i = routes.length - 1; i >= 0; i -= 1) {
    if (routes[i].hasOwnProperty('title')) {
      return routes[i].title;
    }
  }

  return null;
}

const styleSheet = createStyleSheet('AppFrame', (theme) => {
  return {
    '@global': {
      html: {
        boxSizing: 'border-box',
      },
      '*, *:before, *:after': {
        boxSizing: 'inherit',
      },
      body: {
        margin: 0,
        background: theme.palette.background.default,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.text.primary,
        lineHeight: '1.2',
        overflowX: 'hidden',
        WebkitFontSmoothing: 'antialiased', // Antialiasing.
        MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      },
      a: {
        color: theme.palette.accent.A400,
        textDecoration: 'none',
      },
      'a:hover': {
        textDecoration: 'underline',
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
        width: 'auto',
      },
    },
    appFrame: {
      display: 'flex',
      alignItems: 'stretch',
      minHeight: '100vh',
      width: '100%',
    },
    icon: {
      marginLeft: -12,
    },
    grow: {
      flex: '1 1 100%',
    },
    title: {
      marginLeft: 24,
      flex: '0 0 auto',
    },
    appBar: {
      left: 'auto',
      right: 0,
      transition: theme.transitions.create('width'),
    },
    appBarHome: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      drawer: {
        width: '250px',
      },
      appBarShift: {
        width: 'calc(100% - 250px)',
      },
      navIconHide: {
        display: 'none',
      },
    },
  };
});

class AppFrame extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    demos: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    routes: PropTypes.array.isRequired,
    width: PropTypes.string.isRequired,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    drawerOpen: false,
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleDemoButtonClick = (component) => {
    if (demoPaths[component]) {
      window.location = '/#/' + demoPaths[component];
    } else {
      window.location = '/#/component-demos/' + component
    }
  };

  handleToggleShade = () => {
    this.props.dispatch({ type: 'TOGGLE_THEME_SHADE' });
  };

  render() {
    const {
      children,
      demos: demosProp,
      routes,
      width,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);
    const title = getTitle(routes);

    let drawerDocked = isWidthUp('lg', width);
    let navIconClassName = classes.icon;
    let appBarClassName = classes.appBar;

    if (title === null) { // home route, don't shift app bar or dock drawer
      drawerDocked = false;
      appBarClassName += ` ${classes.appBarHome}`;
    } else {
      navIconClassName += ` ${classes.navIconHide}`;
      appBarClassName += ` ${classes.appBarShift}`;
    }


    let hasDemo = false;
    const path = window.location.hash.split('/');

    // component is the last part of the path
    let component = path[path.length - 1];

    // If we're on an api page
    if (path[1] === 'component-api') {
      // Check if the component is in the exceptions map
      if (componentMap[component]) {
        component = componentMap[component];
      } else {
        // Otherwise extract and pluralise the base component name
        component = component.split('-');
        component = component[0] + 's';
      }
      // Is the component in the list of demos?
      hasDemo = demosProp.some((demo) => demo.name === component) || componentMap[component];
    }

    const demoButton = hasDemo &&
      <IconButton
        contrast
        onClick={(event) => this.handleDemoButtonClick(component)}
        className={classes.icon}
      >
        <PlayCircleOutlineIcon />
      </IconButton>;

    const apiMenu = apiMenuData[component] &&
      // Only show the menu on an api page if there's more than one entry
      (path[1] !== 'component-api' || apiMenuData[component].length > 1) &&
      <ApiMenu component={component} className={classes.icon} />;

    return (
      <div className={classes.appFrame}>
        <AppBar className={appBarClassName}>
          <Toolbar>
            <IconButton contrast onClick={this.handleDrawerToggle} className={navIconClassName}>
              <MenuIcon />
            </IconButton>
            {title !== null && (
              <Text className={classes.title} type="title" colorInherit>
                {title}
              </Text>
            )}
            <div className={classes.grow} />
            {demoButton}
            {apiMenu}
            <IconButton contrast onClick={this.handleToggleShade} className={classes.icon}>
              <LightbulbOutlineIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <AppDrawer
          className={classes.drawer}
          docked={drawerDocked}
          routes={routes}
          onRequestClose={this.handleDrawerClose}
          open={drawerDocked || this.state.drawerOpen}
        />
        {children}
      </div>
    );
  }
}

export default compose(
  withWidth(),
  connect(),
)(AppFrame);
