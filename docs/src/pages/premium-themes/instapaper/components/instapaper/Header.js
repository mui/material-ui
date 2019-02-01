import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Hidden from '@material-ui/core/Hidden';
import Search from '@material-ui/icons/Search';
import atoms from '../atoms';

const { Divider, Toolbar, Icon } = atoms;

const logo =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhbW8vOS9If-qdZ7-4SL30yXffg9sRyryDcil-2I8JoKSp36CKxw';
const label = '/static/themes/instapaper/logo.png';

const Header = () => (
  <AppBar position="sticky" color="default" elevation={0}>
    <Toolbar narrow>
      <Grid container alignItems="center">
        <Grid item xs>
          <Grid container alignItems="center">
            <img alt="logo" src={logo} className="image__instagram-logo" />
            <Divider vertical />
            <img alt="label" className="image__instagram-label" src={label} />
          </Grid>
        </Grid>
        <Hidden xsDown>
          <Grid item xs>
            <TextField
              variant="outlined"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Hidden>
        <Grid item>
          <Grid container justify="flex-end">
            <Icon link>explore_outlined</Icon>
            <Icon link>favorite_border_rounded</Icon>
            <Icon link>person_outlined</Icon>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default Header;
