// @flow weak

import React, { Component } from 'react';
import Radio, { RadioGroup } from 'material-ui/Radio';

export default class CompleteRadioGroup extends Component {
  state = {
    value: '',
  };

  render() {
    return (
      <RadioGroup name="color" defaultValue="green">
        <Radio value="red" label="Red" />
        <Radio value="green" label="Green" />
        <Radio value="blue" label="Blue" />
      </RadioGroup>
    );
  }
}

