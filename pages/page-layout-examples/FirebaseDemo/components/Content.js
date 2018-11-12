import React from 'react';

// COMPONENTS
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// ICONS
import Search from '@material-ui/icons/Search';
import Refresh from '@material-ui/icons/Refresh';

const Content = () => (
  <Paper
    style={{
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
    }}
  >
    <AppBar position={'static'} color={'default'}>
      <Toolbar>
        <Search />
        <TextField
          fullWidth
          placeholder={'Search by email address, phone number, or user UID'}
        />
        <Refresh />
      </Toolbar>
    </AppBar>
    <Grid container justify={'center'} alignItems={'center'}>
      <Grid item>
        <img
          src={
            'https://www.gstatic.com/mobilesdk/160505_mobilesdk/zerostate/2x/auth.png'
          }
          alt={'auth'}
          style={{
            width: 192,
            height: 192,
          }}
        />
      </Grid>
      <Grid item xs={5}>
        <Typography variant={'h5'}>
          Authenticate and manage users from a variety of providers without
          server-side code
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

export default Content;
