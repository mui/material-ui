import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import Text from 'material-ui/Text';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import {throttle} from 'material-ui/utils/helpers';
import addEventListener from 'material-ui/utils/addEventListener';

import AppDrawer from './AppDrawer';

export const styleSheet = createStyleSheet('AppFrame', (theme) => {
  const {palette, transitions, typography} = theme;
  return {
    '@raw html': {boxSizing: 'border-box'},
    '@raw *, @raw *:before, @raw *:after': {boxSizing: 'inherit'},
    '@raw body': {
      margin: 0,
      background: palette.background.default,
      fontFamily: typography.fontFamily,
      color: palette.text.primary,
      lineHeight: '1.2',
      overflowX: 'hidden',
    },
    '@raw a': {
      color: palette.accent.A400,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    root: {
      display: 'flex',
      alignItems: 'stretch',
      minHeight: '100vh',
      width: '100vw',
      appBarHome: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
    navIcon: {
      marginLeft: -12,
    },
    title: {
      marginLeft: 24,
    },
    appBar: {
      left: 'auto',
      right: 0,
      transition: transitions.create('width'),
    },
    [theme.breakpoints.up('lg')]: {
      appBarShift: {
        width: 'calc(100% - 250px)',
      },
      navIconHide: {
        display: 'none',
      },
    },
  };
});

export default class AppFrame extends Component {
  static propTypes = {
    children: PropTypes.node,
    routes: PropTypes.array,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    drawerDocked: false,
    drawerOpen: false,
  };

  componentWillMount() {
    this.resizeListener = addEventListener(window, 'resize', this.handleResize);
  }

  componentDidMount() {
    this.mounted = true;
    this.checkWindowSize();
  }

  componentWillUnmount() {
    this.mounted = false;

    if (this.resizeListener) {
      this.resizeListener.remove();
    }
  }

  checkWindowSize = () => {
    if (!this.mounted) {
      return;
    }

    const breakpoint = this.context.theme.breakpoints.getWidth('lg');

    if (this.state.drawerDocked && window.innerWidth < breakpoint) {
      this.setState({drawerDocked: false});
    } else if (!this.state.drawerDocked && window.innerWidth >= breakpoint) {
      this.setState({drawerDocked: true});
    }
  };

  handleResize = throttle(this.checkWindowSize, 100);

  handleDrawerOpen = () => this.setState({drawerOpen: true});
  handleDrawerClose = () => this.setState({drawerOpen: false});
  handleDrawerToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});

  getTitle() {
    const {routes} = this.props;
    for (let i = routes.length - 1; i >= 0; i--) {
      if (routes[i].hasOwnProperty('title')) {
        return routes[i].title;
      }
    }
    return null;
  }

  getCurrentPath() {
    const {routes} = this.props;
    for (let i = routes.length - 1; i >= 0; i--) {
      if (routes[i].hasOwnProperty('path')) {
        return routes[i].path;
      }
    }
    return null;
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const title = this.getTitle();

    let drawerDocked = this.state.drawerDocked;
    let navIconClassName = classes.navIcon;
    let appBarClassName = classes.appBar;

    if (title === null) { // home route, don't shift app bar or dock drawer
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
            <IconButton onClick={this.handleDrawerToggle} className={navIconClassName}>menu</IconButton>
            <Text className={classes.title} type="title">{title}</Text>
          </Toolbar>
        </AppBar>
        <AppDrawer
          docked={drawerDocked}
          routes={this.props.routes}
          onRequestClose={this.handleDrawerClose}
          open={this.state.drawerOpen}
        />
        {this.props.children}
      </div>
    );
  }
}
