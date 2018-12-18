import React from 'react';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

const Header = () => {
  return (
    <AppBar position={'sticky'} color={'default'} elevation={0}>
      <Toolbar className={classNames('toolbar', 'toolbar--narrow')}>
        <Grid container alignItems={'center'}>
          <Grid item xs className={'grid__item--left'}>
            {/*<FontAwesomeIcon icon={['fab', 'instagram']} />*/}
            <div className={'divider--vertical'} />
            <img
              alt={'instagram-label'}
              className={'image__instagram-label'}
              src={
                'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png'
              }
            />
          </Grid>
          <Grid item>
            <TextField
              variant={'outlined'}
              placeholder={'Search'}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs className={'grid__item--right'}>
            {/*<FontAwesomeIcon icon={['far', 'compass']} />*/}
            {/*<FontAwesomeIcon icon={['far', 'heart']} />*/}
            {/*<FontAwesomeIcon icon={['far', 'user']} />*/}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
