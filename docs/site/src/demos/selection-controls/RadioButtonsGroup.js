// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import { LabelRadio, RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl } from 'material-ui/Form';

const styleSheet = createStyleSheet('RadioButtonsGroup', () => ({
  group: {
    margin: '8px 0',
  },
}));

export default class RadioButtonsGroup extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
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
      <FormControl required>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          aria-label="Gender"
          name="gender"
          className={classes.group}
          selectedValue={this.state.selectedValue}
          onChange={this.handleChange}
        >
          <LabelRadio label="Male" value="male" />
          <LabelRadio label="Female" value="female" />
          <LabelRadio label="Other" value="other" />
          <LabelRadio label="Disabled" value="disabled" disabled />
        </RadioGroup>
      </FormControl>
    );
  }
}

