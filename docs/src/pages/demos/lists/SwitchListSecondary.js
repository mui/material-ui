import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import BluetoothIcon from '@material-ui/icons/Bluetooth';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function SwitchListSecondary(props) {
  const { classes } = props;
  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
      <ListItem>
        <ListItemIcon>
          <WifiIcon />
        </ListItemIcon>
        <ListItemText primary="Wi-Fi" />
        <ListItemSecondaryAction>
          <Switch onChange={handleToggle('wifi')} checked={checked.indexOf('wifi') !== -1} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <BluetoothIcon />
        </ListItemIcon>
        <ListItemText primary="Bluetooth" />
        <ListItemSecondaryAction>
          <Switch
            onChange={handleToggle('bluetooth')}
            checked={checked.indexOf('bluetooth') !== -1}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

SwitchListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwitchListSecondary);
