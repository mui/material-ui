// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import WifiIcon from 'material-ui/svg-icons/wifi';
import BluetoothIcon from 'material-ui/svg-icons/bluetooth';

const styleSheet = createStyleSheet('SwitchListSecondary', (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
}));

export default class SwitchListSecondary extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    checked: ['wifi'],
  };

  handleToggle = (event, value) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div className={classes.root}>
        <List subheader={<ListSubheader>Settings</ListSubheader>}>
          <ListItem>
            <WifiIcon />
            <ListItemText primary="Wi-Fi" />
            <ListItemSecondaryAction>
              <Switch
                onClick={(event) => this.handleToggle(event, 'wifi')}
                checked={this.state.checked.indexOf('wifi') !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <BluetoothIcon />
            <ListItemText primary="Bluetooth" />
            <ListItemSecondaryAction>
              <Switch
                onClick={(event) => this.handleToggle(event, 'bluetooth')}
                checked={this.state.checked.indexOf('bluetooth') !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    );
  }
}
