// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import { Card, CardHeader, CardContent } from 'material-ui/Card';


const styleSheet = createStyleSheet('FocusSelectField', () => ({
  inputBox: {
    display: 'inline-flex',
    margin: 8
  }
}));

export default class FocusSelectField extends Component {
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
      <Card>
        <CardHeader
          title="Focus Select Field"
        />
        <CardContent>
          <div className={classes.inputBox}>
            <TextField
              label="Focus On Me"
            />
          </div>
          <div className={classes.inputBox}>
            <SelectField
              label="Tab To Me"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
            </SelectField>
          </div>
          <div className={classes.inputBox}>
            <TextField
              label="Focus On Me"
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}
