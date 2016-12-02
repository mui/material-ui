// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { Radio, RadioGroup } from 'material-ui/Radio';
import { FormLabel } from 'material-ui/Form';

const styleSheet = createStyleSheet('RadioButtonsGroup', () => ({
  group: {
    margin: '8px 0',
  },
}));

export default class RadioButtonsGroup extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    selectedValue: undefined,
  };

  handleChange = (event, value) => {
    this.setState({ selectedValue: value });
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div>
        <RadioGroup
          aria-label="Gender"
          className={classes.group}
          selectedValue={this.state.selectedValue}
          onChange={this.handleChange}
        >
          <FormLabel required>Gender</FormLabel>
          <Radio label="Male" value="male" />
          <Radio label="Female" value="female" />
          <Radio label="Other" value="other" />
        </RadioGroup>
      </div>
    );
  }
}

