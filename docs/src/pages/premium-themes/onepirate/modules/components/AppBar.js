import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
  },
});

function AppBar(props) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
}

export default withStyles(styles)(AppBar);
