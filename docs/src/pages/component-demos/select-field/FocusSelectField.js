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
  },
  column: {
    flex: 1,
    flexDirection: 'row',
    margin: 8,
  },
}));

export default class FocusSelectField extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    value: '',
    selectFocused: false,
    selectClean: true,
  };

  handleChange = (event, index, value) => this.setState({ value });

  handleFocus = () => this.setState({ selectFocused: true });

  handleBlur = () => this.setState({ selectFocused: false });

  handleClean = () => this.setState({ selectClean: true });

  handleDirty = () => this.setState({ selectClean: false });

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
              className={classes.column}
              label="Focus Here"
            />
            <SelectField
              className={classes.column}
              label="Tab Here"
              value={this.state.value}
              onChange={this.handleChange}
              inputProps={{
                onFocus: this.handleFocus,
                onBlur: this.handleBlur,
                onClean: this.handleClean,
                onDirty: this.handleDirty,
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </SelectField>
          </div>
          <div className={classes.row}>
            <LabelCheckbox
              className={classes.column}
              checked={this.state.selectFocused}
              label="Is Focused"
              disabled
            />
            <LabelCheckbox
              className={classes.column}
              checked={this.state.selectClean}
              label="Is Clean"
              disabled
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}
