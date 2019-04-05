import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography component="h1" variant="h6" color="inherit">
        Your Orders
      </Typography>
    </Toolbar>
  </AppBar>
);
