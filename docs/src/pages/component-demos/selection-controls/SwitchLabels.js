// @flow

import React, { Component } from 'react';
import { LabelSwitch } from 'material-ui/Switch';

export default class SwitchLabels extends Component {
  state = {
    checkedA: true,
    checkedB: false,
  };

  render() {
    return (
      <div>
        <LabelSwitch
          checked={this.state.checkedA}
          onChange={(event, checked) => this.setState({ checkedA: checked })}
          label="A"
        />
        <LabelSwitch
          checked={this.state.checkedB}
          onChange={(event, checked) => this.setState({ checkedB: checked })}
          label="B"
        />
        <LabelSwitch label="C" disabled />
      </div>
    );
  }
}

