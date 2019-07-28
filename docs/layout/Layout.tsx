import clsx from 'clsx';
import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerMenu from './components/DrawerMenu';
import Github from '../_shared/svgIcons/GithubIcon';
import SettingsIcon from '@material-ui/icons/Settings';
import LightbulbOutlineIcon from '../_shared/svgIcons/LightbulbIcon';
import TextDirectionRtLIcon from '@material-ui/icons/FormatTextdirectionRToL';
import TextDirectionLtrIcon from '@material-ui/icons/FormatTextdirectionLToR';
import { GITHUB_URL } from '_constants';
import { createOverrides } from './styleOverrides';
import { withRouter, WithRouterProps } from 'next/router';
import { utilsMap, UtilsLib } from '../utils/utilsService';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import {
  Hidden,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Theme,
  Menu,
  MenuItem,
} from '@material-ui/core';

interface LayoutProps extends WithRouterProps, WithStyles<typeof styles, true> {
  toggleThemeType: () => void;
  toggleDirection: () => void;
  onChangeUtils: (lib: UtilsLib) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    // @ts-ignore
    '@global': createOverrides(theme),
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    appBar: {
      [theme.breakpoints.up('md')]: {
        width: 'calc(100% - 250px)',
        left: 250,
      },
    },
    utilsMenuItem: {
      textTransform: 'capitalize',
    },
    main: {
      padding: '20px',
      paddingTop: 75,
      minHeight: 'calc(100vh - 55px)',
      [theme.breakpoints.up('md')]: {
        minHeight: 'calc(100vh - 64px)',
        marginLeft: 250,
      },
    },
    content: {
      [theme.breakpoints.up('lg')]: {
        maxWidth: 1100,
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

class Layout extends Component<LayoutProps> {
  state = {
    anchorEl: null,
    drawerOpen: false,
    selectedIndex: Object.keys(utilsMap).findIndex(lib => lib === 'date-fns'),
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleUtilsMenuOpen = (event: React.MouseEvent<any>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleUtilsChange = (e: React.MouseEvent<any>, index: number) => {
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
    const { classes, toggleThemeType, toggleDirection, theme, router } = this.props;
    const isLanding = (router || location).pathname === '/';

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

            <Tooltip title="Change the peer library for date management">
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
              <IconButton data-testid="toggle-theme-btn" color="inherit" onClick={toggleThemeType}>
                <LightbulbOutlineIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Toggle direction" enterDelay={300}>
              <IconButton color="inherit" onClick={toggleDirection}>
                {theme.direction === 'rtl' ? <TextDirectionLtrIcon /> : <TextDirectionRtLIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Github" enterDelay={300}>
              <IconButton color="inherit" component="a" href={GITHUB_URL}>
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

export default withStyles(styles, { withTheme: true })(withRouter(Layout));
