import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Divider, Toolbar, Typography, withStyles } from '@material-ui/core';

import NavigationMenu from './NavigationMenu';
import { version } from '../../../lib/package.json';

const DrawerMenu = ({ classes }) => (
  <div className={classes.drawerRoot}>
    <Toolbar className={classes.drawerToolbar}>
      <Link to="/">
        <Typography variant="subheading" className={classes.headerLink}>
          Material-UI pickers
        </Typography>
      </Link>

      <Link
        target="_blank"
        rel="noopenner noreferrer"
        to="https://github.com/dmtrKovalenko/material-ui-pickers/releases"
      >
        <Typography variant="caption" className={classes.headerLink}> v{version} </Typography>
      </Link>
    </Toolbar>

    <Divider />
    <NavigationMenu />
  </div>
);

DrawerMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  drawerRoot: {
    width: 250,
  },
  drawerToolbar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerLink: {
    transition: 'color .2s ease-in-out',
    '&:hover': {
      color: theme.palette.primary.dark,
      textDecoration: 'underline',
    },
  },
});

export default withStyles(styles)(DrawerMenu);
