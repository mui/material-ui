// @flow weak

import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup } from 'material-ui/Form';

export default class Checkboxes extends Component {
  state = {
    checkedA: true,
    checkedB: false,
  };

  render() {
    return (
      <FormGroup row>
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
          label="Option C"
          value="checkedC"
        />
        <Checkbox
          disabled
          label="Disabled"
          value="checkedD"
        />
        <Checkbox
          checked
          disabled
          label="Disabled"
          value="checkedE"
        />
      </FormGroup>
    );
  }
}

