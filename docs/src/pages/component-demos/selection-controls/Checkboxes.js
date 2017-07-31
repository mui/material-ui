// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const styleSheet = createStyleSheet({
  checked: {
    color: green[500],
  },
});

class Checkboxes extends Component {
  state = {
    checkedA: true,
    checkedB: false,
    checkedF: true,
  };

  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedA}
              onChange={this.handleChange('checkedA')}
              value="checkedA"
            />
          }
          label="Option A"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedB}
              onChange={this.handleChange('checkedB')}
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
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedF}
              onChange={this.handleChange('checkedF')}
              classes={{
                checked: classes.checked,
              }}
              value="checkedF"
            />
          }
          label="Custom color"
        />
      </FormGroup>
    );
  }
}

Checkboxes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Checkboxes);
