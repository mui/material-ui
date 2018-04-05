import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import { withRouter } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Icon, withStyles, Tooltip } from 'material-ui';

import Github from '_shared/GithubIcon';
import DrawerMenu from './DrawerMenu';

class Layout extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    toggleThemeType: PropTypes.func.isRequired,
    toggleDirection: PropTypes.func.isRequired,
    toggleFrench: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  }

  state = {
    drawerOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  scrollToContent = () => {
    const contentEl = document.getElementById('content');
    contentEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  render() {
    const {
      classes, toggleThemeType, toggleDirection, toggleFrench, theme, location,
    } = this.props;
    const isLanding = location.pathname === '/';

    return (
      <React.Fragment>
        <AppBar
          position="fixed"
          className={classnames(classes.appBar, { [classes.landingAppBar]: isLanding })}
        >
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawerToggle}
            >
              <Icon>menu</Icon>
            </IconButton>

            <div className={classes.flex} />

            <Tooltip title="Toggle English/French locale for pickers" enterDelay={300}>
              <IconButton color="inherit" onClick={toggleFrench}>
                <Icon>language</Icon>
              </IconButton>
            </Tooltip>

            <Tooltip title="Toggle light/dark theme" enterDelay={300}>
              <IconButton color="inherit" onClick={toggleThemeType}>
                <Icon>lightbulb_outline</Icon>
              </IconButton>
            </Tooltip>

            <Tooltip title="Toggle direction" enterDelay={300}>
              <IconButton color="inherit" onClick={toggleDirection}>
                <Icon>format_textdirection_l_to_r</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Github" enterDelay={300}>
              <IconButton
                color="inherit"
                component="a"
                href="https://github.com/dmtrKovalenko/material-ui-pickers"
              >
                <Github color="inherit" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.drawerOpen}
            onClose={this.handleDrawerToggle}
            onClick={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <DrawerMenu />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant={isLanding ? 'temporary' : 'permanent'}
            open={this.state.drawerOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <DrawerMenu />
          </Drawer>
        </Hidden>

        <main className={classnames(classes.main, { [classes.landingMain]: isLanding })}>
          <div className={classnames(classes.content, { [classes.landingMain]: isLanding })}>
            {this.props.children}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    // boxShadow: 'unset',
    [theme.breakpoints.up('md')]: {
      left: 250,
      width: 'calc(100% - 250px)',
    },
  },
  main: {
    marginTop: 55,
    padding: '20px',
    minHeight: 'calc(100vh - 55px)',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('md')]: {
      marginTop: 64,
      minHeight: 'calc(100vh - 64px)',
      marginLeft: 250,
    },
  },
  content: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: 960,
      margin: '0 auto',
    },
  },
  landingMain: {
    padding: 0,
    maxWidth: '100vw',
    marginLeft: 0,
  },
  landingAppBar: {
    left: 0,
    width: '100vw',
    boxShadow: 'unset',
  },
});

export default withStyles(styles, { withTheme: true })(withRouter(Layout));
