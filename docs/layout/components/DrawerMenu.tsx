import React from 'react';
import Link from 'next/link';
import {
  Divider,
  Toolbar,
  Typography,
  withStyles,
  createStyles,
  Theme,
  WithStyles,
} from '@material-ui/core';

import NavigationMenu from './NavigationMenu';
import { version } from 'material-ui-pickers/package.json';

const DrawerMenu: React.SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <div className={classes.drawerRoot}>
    <Toolbar className={classes.drawerToolbar}>
      <Link prefetch href="/">
        <Typography variant="subtitle1" className={classes.headerLink}>
          Material-UI pickers
        </Typography>
      </Link>

      <a
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
        href="https://github.com/dmtrKovalenko/material-ui-pickers/releases"
      >
        <Typography variant="caption" className={classes.headerLink}>
          {version}
        </Typography>
      </a>
    </Toolbar>

    <Divider />
    <NavigationMenu />
  </div>
);

const styles = (theme: Theme) =>
  createStyles({
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
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'color .2s ease-in-out',
      '&:hover': {
        color: theme.palette.primary.dark,
        textDecoration: 'underline',
      },
    },
  });

export default withStyles(styles)(DrawerMenu);
