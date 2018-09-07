import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    padding: 0,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 24,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 6,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  searchContainer: {
    width: '40%',
    position: 'relative',
    borderRadius: 2,
    background: fade(theme.palette.common.white, 0.15),
    transition: theme.transitions.create('width'),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 6,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    paddingLeft: theme.spacing.unit * 6,
  },
  rightSectionDesktop: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  rightSectionMobile: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    searchInput: '',
  };

  handleChange = event => {
    this.setState({ searchInput: event.target.value });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { searchInput, anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        id="mobile-menu"
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge className={classes.margin} badgeContent={4} color="primary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge className={classes.margin} badgeContent={17} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.row}>
            <IconButton color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="title" color="inherit" noWrap>
              Material-UI
            </Typography>
          </div>
          <section className={classes.searchContainer}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Input
              id="search-input"
              placeholder="Search…"
              value={searchInput}
              onChange={this.handleChange}
              disableUnderline
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </section>
          <div className={classes.rightSectionDesktop}>
            <IconButton color="inherit">
              <Badge className={classes.margin} badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge className={classes.margin} badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-owns={isMenuOpen ? 'material-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.rightSectionMobile}>
            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        {renderMenu}
        {renderMobileMenu}
      </AppBar>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);
