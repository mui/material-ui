// @flow

import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui/Form';

export default class Checkboxes extends Component {
  state = {
    checkedA: true,
    checkedB: false,
  };

  render() {
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedA}
              onChange={(event, checked) => this.setState({ checkedA: checked })}
              value="checkedA"
            />
          }
          label="Option A"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedB}
              onChange={(event, checked) => this.setState({ checkedB: checked })}
              value="checkedB"
            />
          }
          label="Option B"
        />
        <FormControlLabel control={<Checkbox value="checkedC" />} label="Option C" />
        <FormControlLabel disabled control={<Checkbox value="checkedD" />} label="Disabled" />
        <FormControlLabel
          disabled
          control={<Checkbox checked value="checkedE" />}
          label="Disabled"
        />
        <FormControlLabel
          disabled
          control={<Checkbox checked value="checkedE" indeterminate />}
          label="Indeterminate"
        />
      </FormGroup>
    );
  }
}
