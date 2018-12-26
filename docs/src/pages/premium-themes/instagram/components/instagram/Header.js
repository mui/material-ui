import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import atoms from '../atoms';
import molecules from '../molecules';

const { Divider, Toolbar, Icon } = atoms;
const { Grid } = molecules;

const logo =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhbW8vOS9If-qdZ7-4SL30yXffg9sRyryDcil-2I8JoKSp36CKxw';
const label =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png';

const Header = () => (
  <AppBar position={'sticky'} color={'default'} elevation={0}>
    <Toolbar narrow>
      <Grid container alignItems={'center'}>
        <Grid item xs flex style={{ alignItems: 'center' }}>
          <img alt={'logo'} src={logo} className={'image__instagram-logo'} />
          <Divider vertical />
          <img alt={'label'} className={'image__instagram-label'} src={label} />
        </Grid>
        <Grid item>
          <TextField
            variant={'outlined'}
            placeholder={'Search'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs flex style={{ justifyContent: 'flex-end' }}>
          <Icon link>explore_outlined</Icon>
          <Icon link>favorite_border_rounded</Icon>
          <Icon link>person_outlined</Icon>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default Header;
