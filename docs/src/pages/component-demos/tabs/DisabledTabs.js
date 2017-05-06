// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

class DisabledTabs extends Component {
  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({ index });
  };

  render() {
    return (
      <Paper>
        <Tabs index={this.state.index} onChange={this.handleChange}>
          <Tab label="Active" />
          <Tab label="Disabled" disabled />
          <Tab label="Active" />
        </Tabs>
      </Paper>
    );
  }
}

export default DisabledTabs;
