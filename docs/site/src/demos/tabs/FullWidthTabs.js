// @flow weak

import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';

export default class FullWidthTabs extends Component {
  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({ index });
  }

  render() {
    return (
      <Paper style={{ width: 500 }}>
        <Tabs
          index={this.state.index}
          onChange={this.handleChange}
          textColor="accent"
          fullWidth
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Paper>
    );
  }
}
