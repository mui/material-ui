// @flow weak

import React, { Component } from 'react';
import TextField, { TextFieldInput, TextFieldLabel } from 'material-ui/TextField';

export default class CompleteTextField extends Component {
  state = {
    value: '',
  };

  render() {
    return (
      <TextField>
        <TextFieldLabel htmlFor="name">
          Name
        </TextFieldLabel>
        <TextFieldInput
          id="name"
          value={this.state.value}
          onChange={(event) => this.setState({ value: event.target.value })}
        />
      </TextField>
    );
  }
}

