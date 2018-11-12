import React from 'react';
import classNames from 'classnames';
// COMPONENTS
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Help from '@material-ui/icons/Help';
import withStyles from '@material-ui/core/styles/withStyles';
// ICONS
import Notifications from '@material-ui/icons/Notifications';

const styles = theme => ({
  standardBar: {
    minHeight: 48,
  },
  topBar: {
    zIndex: 10000,
    background: theme.palette.common.white,
  },
  secondaryBar: {
    zIndex: 9990,
  },
  inline: {
    display: 'inline-block',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 500,
  },
  smallAvatar: {
    width: 32,
    height: 32,
  },
  inverted: {
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  buttonInverted: {
    borderColor: 'rgba(255,255,255,0.7)',
  },
});

const Header = ({ classes }) => (
  <React.Fragment>
    <AppBar className={classes.topBar} color={'default'} position={'sticky'} elevation={1}>
      <Toolbar className={classes.standardBar}>
        <Grid container justify={'center'} alignItems={'center'} spacing={16}>
          <Grid item>
            <Typography className={classes.inline}>
              You are viewing the Firebase demo project.
            </Typography>{' '}
            <Typography className={classNames(classes.inline, classes.link)}>Learn more</Typography>
          </Grid>
          <Grid item />
          <Grid item>
            <Button color={'primary'} variant={'contained'}>
              Create a project
            </Button>
          </Grid>
          <Grid item>
            <Button>Exit demo</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <AppBar color={'primary'} position={'sticky'} elevation={0}>
      <Toolbar className={classes.standardBar}>
        <Grid container spacing={16} justify={'flex-end'} alignItems={'center'}>
          <Grid item>
            <Typography className={classes.inverted} component={'a'} href={'#'}>
              Go to docs
            </Typography>
          </Grid>
          <Grid item>
            <Notifications color={'inherit'} />
          </Grid>
          <Grid item>
            <Avatar
              className={classes.smallAvatar}
              src={
                'https://lh3.googleusercontent.com/-mYNSKSzYGjw/AAAAAAAAAAI/AAAAAAAAAAA/ABtNlbABtwn15AVhtNsFWiPi-8vW8A7Lig/s64-c-mo/photo.jpg'
              }
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <AppBar className={classes.secondaryBar} color={'primary'} position={'static'} elevation={0}>
      <Toolbar className={classes.standardBar}>
        <Grid container alignItems={'center'} spacing={16}>
          <Grid item xs>
            <Typography className={classes.headerText} color={'inherit'} variant={'h5'}>
              Authentication
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={classes.buttonInverted}
              variant={'outlined'}
              color={'inherit'}
              size={'small'}
            >
              Web setup
            </Button>
          </Grid>
          <Grid item>
            <Help />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <AppBar color={'primary'} position={'static'}>
      <Tabs value={0} textColor={'inherit'}>
        <Tab textColor={'inherit'} label="User" />
        <Tab textColor={'inherit'} label="Sign-in method" />
        <Tab textColor={'inherit'} label="Templates" />
        <Tab textColor={'inherit'} label="Usage" />
      </Tabs>
    </AppBar>
  </React.Fragment>
);

export default withStyles(styles)(Header);
