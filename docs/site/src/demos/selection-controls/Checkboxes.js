// @flow weak

import React, { Component } from 'react';
import Checkbox, { CheckboxGroup } from 'material-ui/Checkbox';

export default class Checkboxes extends Component {
  state = {
    checkedA: true,
    checkedB: false,
    checkedC: false,
  };

  render() {
    return (
      <CheckboxGroup>
        <Checkbox
          checked={this.state.checkedA}
          onChange={(event, checked) => this.setState({ checkedA: checked })}
          label="Option A"
          value="checkedA"
        />
        <Checkbox
          checked={this.state.checkedB}
          onChange={(event, checked) => this.setState({ checkedB: checked })}
          label="Option B"
          value="checkedB"
        />
        <Checkbox
          disabled
          checked={this.state.checkedC}
          onChange={(event, checked) => this.setState({ checkedC: checked })}
          label="Option C"
          value="checkedC"
        />
        <Checkbox
          label="Option D"
          value="checkedD"
        />
      </CheckboxGroup>
    );
  }
}

