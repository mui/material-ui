/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import Radio from 'material-ui/Radio';

class RadioButtons extends React.Component {
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

export default RadioButtons;
