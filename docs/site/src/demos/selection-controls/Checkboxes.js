// @flow weak

import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

export default class Checkboxes extends Component {
  state = {
    checkedA: true,
    checkedB: false,
    checkedC: false,
  };

  render() {
    return (
      <div>
        <Checkbox
          checked={this.state.checkedA}
          onChange={(event, checked) => this.setState({ checkedA: checked })}
          aria-label="Option A"
          value="checkedA"
        />
        <Checkbox
          checked={this.state.checkedB}
          onChange={(event, checked) => this.setState({ checkedB: checked })}
          aria-label="Option B"
          value="checkedB"
        />
        <Checkbox
          disabled
          checked={this.state.checkedC}
          onChange={(event, checked) => this.setState({ checkedC: checked })}
          aria-label="Option C"
          value="checkedC"
        />
        <Checkbox
          aria-label="Option D"
          value="checkedD"
        />
      </div>
    );
  }
}

