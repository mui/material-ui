import * as React from 'react';
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';
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
