// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

const styleSheet = createStyleSheet(theme => ({
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
          aria-label="gender"
          name="gender"
          className={classes.group}
          selectedValue={this.state.selectedValue}
          onChange={this.handleChange}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          <FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />
        </RadioGroup>
      </FormControl>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(RadioButtonsGroup);
