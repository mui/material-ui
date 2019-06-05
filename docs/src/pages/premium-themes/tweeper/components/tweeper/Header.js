import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';
import ListItemText from '@material-ui/core/ListItemText';
import atoms from '../atoms';
import molecules from '../molecules';

const { AppBar, Avatar, Badge, Icon, Toolbar } = atoms;
const { Tabs, Tab, ListItem, InputAdornment } = molecules;

const Header = () => (
  <AppBar position="sticky">
    <Toolbar>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={6} sm={4}>
          <Tabs value={0} variant="fullWidth">
            <Tab
              onlyIcon
              icon={
                <Badge dotted badgeContent="">
                  <Icon>home</Icon>
                </Badge>
              }
            />
            <Tab onlyIcon icon={<Icon>search</Icon>} />
            <Tab
              onlyIcon
              icon={
                <Badge number badgeContent={2}>
                  <Icon>notifications</Icon>
                </Badge>
              }
            />
            <Tab onlyIcon icon={<Icon>mail</Icon>} />
          </Tabs>
        </Grid>
        <Hidden smDown>
          <Grid item sm>
            <TextField
              fullWidth
              placeholder="Find Tweets"
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
        </Hidden>
        <Grid item xs={6} sm="auto">
          <ListItem>
            <Avatar
              alt="My profile"
              src="https://pbs.twimg.com/profile_images/1060539954361622533/-9ofKMvA_bigger.jpg"
            />
            <ListItemText primary="siriwatknp" />
          </ListItem>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default Header;
