import React from 'react';
import Link from 'next/link';
import NavigationMenu from './NavigationMenu';
import { GITHUB_URL } from '_constants';
import { version } from '@material-ui/pickers/package.json';
import { Divider, Toolbar, Typography, Theme } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';

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
        href={GITHUB_URL + '/releases'}
      >
        <Typography variant="caption" color="textPrimary" className={classes.headerLink}>
          {version}
        </Typography>
      </a>
    </Toolbar>

    <Divider />
    <NavigationMenu />
  </div>
);

export default withStyles(styles)(DrawerMenu);
