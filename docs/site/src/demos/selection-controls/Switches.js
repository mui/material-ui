// @flow weak

import React, { Component } from 'react';
import Switch from 'material-ui/Switch';

export default class Switches extends Component {
  state = {
    checkedA: true,
    checkedB: false,
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
        <Switch
          aria-label="checkedC"
        />
      </div>
    );
  }
}

