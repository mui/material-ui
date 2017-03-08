// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Icon from 'material-ui/Icon';

// const styleSheet = createStyleSheet('SimpleBadge', (theme) => ({
//   badge: {
//     margin: `0 ${theme.spacing.unit * 2}px`,
//   },
// }));

export default class SimpleSelectField extends Component {
  // const classes = context.styleManager.render(styleSheet);
  state = {
    value: '',
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <SelectField
          label="Sample"
          value={this.state.value}
          onChange={this.handleChange}
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
