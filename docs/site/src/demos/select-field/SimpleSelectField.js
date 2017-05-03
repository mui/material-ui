// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/Menu/MenuItem';

const styleSheet = createStyleSheet('SimpleSelectField', () => ({
  selectBox: {
    display: 'inline-flex',
    margin: 8,
  },
}));

export default class SimpleSelectField extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    value: '',
  };

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div>
        <div className={classes.selectBox}>
          <SelectField
            label="Sample"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
          </SelectField>
        </div>
        <div className={classes.selectBox}>
          <SelectField
            label="Sample"
            hideLabel
            value={this.state.value}
            onChange={this.handleChange}
            className={classes.select}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
          </SelectField>
        </div>
      </div>
    );
  }
}

SimpleSelectField.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
