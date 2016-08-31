import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';

export default class BasicTabs extends Component {
  state = {
    tabIndex: 0,
  };

  render() {
    return (
      <Paper style={{ width: 700 }}>
        <Tabs activeTab={this.state.tabIndex} centered>
          <Tab onClick={() => this.setState({ tabIndex: 0 })} primary>Item One</Tab>
          <Tab onClick={() => this.setState({ tabIndex: 1 })} primary>Item Two</Tab>
          <Tab onClick={() => this.setState({ tabIndex: 2 })} primary>Item Three</Tab>
        </Tabs>
      </Paper>
    );
  }
}
