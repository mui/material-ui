// @flow

import React, { Component } from 'react';
import Switch from 'material-ui/Switch';

export default class Switches extends Component {
  state = {
    checkedA: true,
    checkedB: false,
    checkedC: false,
    checkedD: true,
  };

  render() {
    return (
      <div>
        <Switch
          checked={this.state.checkedA}
          onChange={(event, checked) => this.setState({ checkedA: checked })}
          aria-label="checkedA"
        />
        <Switch
          checked={this.state.checkedB}
          onChange={(event, checked) => this.setState({ checkedB: checked })}
          aria-label="checkedB"
        />
        <Switch checked={this.state.checkedC} aria-label="checkedC" disabled />
        <Switch checked={this.state.checkedD} aria-label="checkedD" disabled />
      </div>
    );
  }
}
