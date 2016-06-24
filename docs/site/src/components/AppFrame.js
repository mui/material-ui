import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import AppBar from 'material-ui/AppBar';
import Toolbar, {ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';

// import AppDrawer from './AppDrawer';
// <AppDrawer
//   onRequestClose={this.handleDrawerClose}
//   open={this.state.drawerOpen}
// />

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
    root: {
      display: 'flex',
      alignItems: 'stretch',
      minHeight: '100vh',
      width: '100vw',
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
      if (routes[i].title) {
        return routes[i].title;
      }
    }
    return null;
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <IconButton onClick={this.handleDrawerToggle}>menu</IconButton>
            <ToolbarTitle>{this.getTitle()}</ToolbarTitle>
          </Toolbar>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}
