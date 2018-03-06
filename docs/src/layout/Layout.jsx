import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import{ AppBar, Toolbar, IconButton, Icon, withStyles, Tooltip } from 'material-ui';

import Github from '_shared/GithubIcon';
import DrawerMenu from './DrawerMenu';

class Layout extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    toggleThemeType: PropTypes.func.isRequired,
    toggleDirection: PropTypes.func.isRequired,
    toggleFrench: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
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
      classes, toggleThemeType, toggleDirection, toggleFrench, theme,
    } = this.props;

    return (
      <React.Fragment>
        <AppBar position="fixed" className={classes.appBar}>
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

            <Tooltip title="Toggle English/French moment locale" enterDelay={300}>
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
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <DrawerMenu />
          </Drawer>
        </Hidden>

        <main className={classes.main}>
          {this.props.children}
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
    boxShadow: 'unset',
    [theme.breakpoints.up('md')]: {
      left: 250,
      width: 'calc(100% - 250px)'
    },
  },
  appToolbar: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.common.white,
    padding: '40px 20px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '100px',
      minHeight: 'calc(100vh - 55px)',
    },
  },
  getStarted: {
    marginTop: '10px',
  },
  main: {
    marginTop: 55,
    padding: '20px',
    height: 'calc(100vh - 55px)',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('md')]: {
      marginTop: 64,
      height: 'calc(100vh - 64px)',
      marginLeft: 250
    },
  },
  content: {
    paddingTop: '80px',
    backgroundColor: theme.palette.background.default,
    minHeight: 'calc(100vh - 63px)',
    maxWidth: 900,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    '@media(max-width: 600px)': {
      minHeight: 'calc(100vh - 55px)',
    },
  },
  changeOutside: {
    maxWidth: 200,
    margin: '0 auto',
  },
});

export default withStyles(styles, { withTheme: true })(Layout);
