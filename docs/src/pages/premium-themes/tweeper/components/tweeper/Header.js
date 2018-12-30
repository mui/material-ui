import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import atoms from '../atoms';
import molecules from '../molecules';

const { AppBar, Avatar, Badge, Icon, Toolbar } = atoms;
const { Tabs, Tab, ListItem, InputAdornment } = molecules;

const Header = () => (
  <AppBar position={'sticky'} elevation={1}>
    <Toolbar>
      <Grid container alignItems={'center'} spacing={16}>
        <Grid item xs={4}>
          <Tabs value={0} fullWidth>
            <Tab
              onlyIcon
              icon={
                <Badge dotted badgeContent={''}>
                  <Icon>home</Icon>
                </Badge>
              }
              disableRipple
            />
            <Tab onlyIcon icon={<Icon>search</Icon>} disableRipple />
            <Tab
              onlyIcon
              icon={
                <Badge number badgeContent={2}>
                  <Icon>notifications</Icon>
                </Badge>
              }
              disableRipple
            />
            <Tab onlyIcon icon={<Icon>mail</Icon>} disableRipple />
          </Tabs>
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            placeholder={'Find Tweets'}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <ListItem noPadY>
            <Avatar
              src={'https://pbs.twimg.com/profile_images/1060539954361622533/-9ofKMvA_bigger.jpg'}
            />
            <ListItemText primary={'siriwatknp'} />
          </ListItem>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default Header;
