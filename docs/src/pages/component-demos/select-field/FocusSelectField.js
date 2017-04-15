// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import SelectField from 'material-ui/SelectField';
import { LabelCheckbox } from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import { Card, CardHeader, CardContent } from 'material-ui/Card';


const styleSheet = createStyleSheet('FocusSelectField', () => ({
  row: {
    display: 'flex',
    minWidth: 300,
  },
  col: {
    margin: 8,
  }
}));

export default class FocusSelectField extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    value: '',
    selectFocused: false,
  };

  handleChange = (event, index, value) => this.setState({ value });

  handleFocus = () => this.setState({ selectFocused: true });

  handleBlur = () => this.setState({ selectFocused: false });

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <Card>
        <CardHeader
          title="Focus Select Field"
        />
        <CardContent>
          <div className={classes.row}>
            <TextField
              className={classes.col}
              label="Focus Here"
             />
            <SelectField
              className={classes.col}
              label="Tab Here"
              value={this.state.value}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
            </SelectField>
            <LabelCheckbox
              className={classes.col}
              checked={this.state.selectFocused}
              label="is focused"
              disabled
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}
