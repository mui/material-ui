import * as React from 'react';
import { Theme } from '@material-ui/core/styles';
import { withStyles, WithStyles } from '@material-ui/styles';
import MuiAppBar, { AppBarProps } from '@material-ui/core/AppBar';

const styles = (theme: Theme) => ({
  root: {
    color: theme.palette.common.white,
  },
});

function AppBar(props: WithStyles<typeof styles> & AppBarProps) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
}

export default withStyles(styles)(AppBar);
