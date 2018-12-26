import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Tab from '@material-ui/core/Tab';

import atoms from '../atoms';
import molecules from '../molecules';

const { Toolbar, Typography, Icon, IconButton, Badge, Button, Avatar } = atoms;
const { Tabs } = molecules;

const Header = () => {
  return (
    <React.Fragment>
      <AppBar position={'relative'} color={'default'} elevation={2}>
        <Toolbar narrow>
          <Grid container spacing={16} justify={'center'} alignItems={'center'}>
            <Grid item>
              <Typography inline color={'textSecondary'}>
                You're viewing the Firebase demo project.
              </Typography>{' '}
              <Typography link>Learn more</Typography>
            </Grid>
            <Grid item>
              <Button variant={'contained'} color={'primary'}>
                Create a project
              </Button>
            </Grid>
            <Grid item>
              <Button>Exit demo</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar color={'primary'} position={'static'} elevation={0}>
        <Toolbar narrow>
          <Grid
            container
            spacing={16}
            justify={'flex-end'}
            alignItems={'center'}
          >
            <Grid item>
              <Typography linkInverted>Go to docs</Typography>
            </Grid>
            <Grid item>
              <Tooltip title={'Firebase alerts - New alerts'}>
                <Badge dotted badgeContent={''}>
                  <Icon linkInverted>notifications</Icon>
                </Badge>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip
                title={
                  <React.Fragment>
                    <Typography inverted>Google account</Typography>
                    <Typography inverted light>
                      siriwatkunaporn@gmail.com
                    </Typography>
                  </React.Fragment>
                }
              >
                <IconButton noPad>
                  <Avatar small src={'http://i.pravatar.cc/300'} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar color={'primary'} position={'static'} elevation={0}>
        <Toolbar narrow>
          <Grid
            container
            spacing={16}
            justify={'space-between'}
            alignItems={'center'}
          >
            <Grid item>
              <Typography gutterBottom color={'inherit'} variant={'h5'}>
                Authentication
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={16}>
                <Grid item>
                  <Button inverted variant={'outlined'}>
                    Web setup
                  </Button>
                </Grid>
                <Grid item>
                  <Tooltip title={'Help'}>
                    <IconButton separated linkInverted>
                      <Icon front>help</Icon>
                      <Icon caret>arrow_drop_down</Icon>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar color={'primary'} position={'static'} elevation={0}>
        <Tabs inverted value={0}>
          <Tab label="Users" disableRipple />
          <Tab label="Sign-in method" disableRipple />
          <Tab label="Templates" disableRipple />
          <Tab label="Usage" disableRipple />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
