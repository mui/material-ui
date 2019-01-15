import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiToolbar from '@material-ui/core/Toolbar';

export const styles = theme => ({
  root: {
    height: 64,
    [theme.breakpoints.up('sm')]: {
      height: 70,
    },
  },
});

function Toolbar(props) {
  return <MuiToolbar {...props} />;
}

export default withStyles(styles)(Toolbar);
