// @flow weak

import React, { Component } from 'react';
import Radio from 'material-ui/Radio';

export default class RadioButtons extends Component {
  state = {
    selectedValue: undefined,
  };

  handleChange = event => {
    this.setState({ selectedValue: event.currentTarget.value });
  };

  render() {
    return (
      <div>
        <Radio
          checked={this.state.selectedValue === 'a'}
          onChange={this.handleChange}
          value="a"
          name="radio button demo"
          aria-label="A"
        />
        <Radio
          checked={this.state.selectedValue === 'b'}
          onChange={this.handleChange}
          value="b"
          name="radio button demo"
          aria-label="B"
        />
        <Radio
          checked={this.state.selectedValue === 'c'}
          onChange={this.handleChange}
          value="c"
          name="radio button demo"
          aria-label="C"
        />
      </div>
    );
  }
}
