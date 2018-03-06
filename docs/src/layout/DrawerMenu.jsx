import React from 'react'
import { version } from '../../../lib/package.json'
import { Divider, Toolbar, Typography, withStyles } from 'material-ui';
import NavigationMenu from './NavigationMenu';

const DrawerMenu = ({ classes }) => (
  <div className={classes.drawerRoot}>
    <Toolbar className={classes.drawerToolbar}>
      <Typography variant="subheading"> Material-UI pickers</Typography>
      <Typography variant="caption"> v{version} </Typography>
    </Toolbar>
    
    <Divider />
    <NavigationMenu />
  </div>
)

const styles = theme => ({
  drawerRoot: {
    width: 250
  },
  drawerToolbar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
})

export default withStyles(styles)(DrawerMenu) 