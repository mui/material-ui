import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import Text from 'material-ui/Text';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';

import AppDrawer from './AppDrawer';

export const styleSheet = createStyleSheet('AppFrame', (theme) => {
  const {palette, typography} = theme;
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
    '@raw pre': {
      padding: '12px 18px',
      backgroundColor: '#fff',
      boxShadow: theme.shadows[4],
      borderRadius: 3,
    },
    '@raw code': {
      fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
      fontSize: 12,
      padding: '3px 6px',
      color: '#333',
      backgroundColor: '#fff',
    },
    '@raw pre > code': {
      padding: 0,
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
  };
});

export default class AppFrame extends Component {
  static propTypes = {
    children: PropTypes.node,
    routes: PropTypes.array,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    drawerOpen: false,
  };

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
    const appBarClassname = this.getCurrentPath() === '/' ? classes.appBarHome : '';

    return (
      <div className={classes.root}>
        <AppBar className={appBarClassname}>
          <Toolbar>
            <IconButton onClick={this.handleDrawerToggle} className={classes.navIcon}>menu</IconButton>
            <Text className={classes.title} type="title">{title}</Text>
          </Toolbar>
        </AppBar>
        <AppDrawer
          routes={this.props.routes}
          onRequestClose={this.handleDrawerClose}
          open={this.state.drawerOpen}
        />
        {this.props.children}
      </div>
    );
  }
}
