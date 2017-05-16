// @flow

import React, { Component } from 'react';
import { LabelCheckbox } from 'material-ui/Checkbox';
import { FormGroup } from 'material-ui/Form';

export default class Checkboxes extends Component {
  state = {
    checkedA: true,
    checkedB: false,
  };

  render() {
    return (
      <FormGroup row>
        <LabelCheckbox
          checked={this.state.checkedA}
          onChange={(event, checked) => this.setState({ checkedA: checked })}
          label="Option A"
          value="checkedA"
        />
        <LabelCheckbox
          checked={this.state.checkedB}
          onChange={(event, checked) => this.setState({ checkedB: checked })}
          label="Option B"
          value="checkedB"
        />
        <LabelCheckbox
          label="Option C"
          value="checkedC"
        />
        <LabelCheckbox
          disabled
          label="Disabled"
          value="checkedD"
        />
        <LabelCheckbox
          checked
          disabled
          label="Disabled"
          value="checkedE"
        />
      </FormGroup>
    );
  }
}

