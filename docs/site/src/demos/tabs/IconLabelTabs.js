// @flow weak

import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import PersonPinIcon from 'material-ui/svg-icons/maps/person-pin';

export default class IconLabelTabs extends Component {
  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({ index });
  };

  render() {
    return (
      <Paper style={{ width: 500 }}>
        <Tabs
          index={this.state.index}
          onChange={this.handleChange}
          fullWidth
          textColor="accent"
        >
          <Tab
            icon={<PhoneIcon />}
            label="RECENTS"
          />
          <Tab
            icon={<FavoriteIcon />}
            label="FAVORITES"
          />
          <Tab
            icon={<PersonPinIcon />}
            label="NEARBY"
          />
        </Tabs>
      </Paper>
    );
  }
}
