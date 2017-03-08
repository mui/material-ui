// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Icon from 'material-ui/Icon';

const styleSheet = createStyleSheet('SimpleSelectField', (theme) => ({
  select: {
    margin: 8,
  }
}));

export default class SimpleSelectField extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    value: '',
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div>
        <SelectField
          label="Sample"
          value={this.state.value}
          onChange={this.handleChange}
          className={classes.select}
        >
          <MenuItem value=''>None</MenuItem>
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
        </SelectField>

         <SelectField
            label="Sample"
            hideLabel={true}
            value={this.state.value}
            onChange={this.handleChange}
            className={classes.select}
          >
            <MenuItem value=''>None</MenuItem>
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
          </SelectField>

      </div>
    );
  }
}

SimpleSelectField.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
