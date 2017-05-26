// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { LabelRadio, RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl } from 'material-ui/Form';

const styleSheet = createStyleSheet('RadioButtonsGroup', theme => ({
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
}));

class RadioButtonsGroup extends Component {
  state = {
    selectedValue: undefined,
  };

  handleChange = (event, value) => {
    this.setState({ selectedValue: value });
  };

  render() {
    const classes = this.props.classes;

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

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(RadioButtonsGroup);
