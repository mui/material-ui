import React, { Component } from 'react';
import clsx from 'clsx';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  withStyles,
  Tooltip,
  WithStyles,
  createStyles,
  Theme,
  Menu,
  MenuItem,
} from '@material-ui/core';

import Github from '../_shared/svgIcons/GithubIcon';
import DrawerMenu from './DrawerMenu';
import { utilsMap, UtilsLib } from '../App';

import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import TextDirectionLtrIcon from '@material-ui/icons/FormatTextdirectionLToR';
import TextDirectionRtLIcon from '@material-ui/icons/FormatTextdirectionRToL';
import LightbulbOutlineIcon from '../_shared/svgIcons/LightbulbIcon';

interface LayoutProps extends RouteComponentProps, WithStyles<typeof styles, true> {
  toggleThemeType: () => void;
  toggleDirection: () => void;
  onChangeUtils: (lib: UtilsLib) => void;
  children: React.ReactChild;
}

class Layout extends Component<LayoutProps> {
  state = {
    anchorEl: null,
    drawerOpen: false,
    selectedIndex: 2, // date-fns
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleUtilsMenuOpen = (event: React.MouseEvent<any>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleUtilsChange = (event: React.MouseEvent<any>, index: number) => {
    this.props.onChangeUtils(Object.keys(utilsMap)[index] as UtilsLib);
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  scrollToContent = () => {
    const contentEl = document.getElementById('content');
    contentEl!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, toggleThemeType, toggleDirection, theme, location } = this.props;
    const isLanding = location.pathname === '/';

    return (
      <React.Fragment>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.landingAppBar]: isLanding,
          })}
        >
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

            <div className={classes.flex} />

            <Tooltip title="Change library that will work with date under the hood">
              <IconButton color="inherit" onClick={this.handleUtilsMenuOpen}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="utils-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {Object.keys(utilsMap).map((option, index) => (
                <MenuItem
                  key={option}
                  className={classes.utilsMenuItem}
                  selected={index === this.state.selectedIndex}
                  onClick={event => this.handleUtilsChange(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>

            <Tooltip title="Toggle light/dark theme" enterDelay={300}>
              <IconButton color="inherit" onClick={toggleThemeType}>
                <LightbulbOutlineIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Toggle direction" enterDelay={300}>
              <IconButton color="inherit" onClick={toggleDirection}>
                {theme.direction === 'rtl' ? <TextDirectionLtrIcon /> : <TextDirectionRtLIcon />}
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
          >
            <DrawerMenu />
          </Drawer>
        </Hidden>

        <main
          className={clsx(classes.main, {
            [classes.landingMain]: isLanding,
          })}
        >
          <div
            className={clsx(classes.content, {
              [classes.landingMain]: isLanding,
            })}
          >
            {this.props.children}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      body: {
        backgroundColor: theme.palette.background.default,
      },
    },
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
        width: 'calc(100% - 250px)',
        left: 250,
      },
    },
    utilsMenuItem: {
      textTransform: 'capitalize',
    },
    main: {
      marginTop: 55,
      padding: '20px',
      minHeight: 'calc(100vh - 55px)',
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
      marginRight: 0,
    },
    landingAppBar: {
      left: 0,
      right: 0,
      width: '100vw',
      boxShadow: 'unset',
    },
  });

export default withStyles(styles, { withTheme: true })(withRouter(Layout));
