// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Card, { CardHeader, CardContent } from 'material-ui/Card';

const styleSheet = createStyleSheet('SimpleSelectField', {
  selectBox: {
    width: 200,
    display: 'inline-flex',
    margin: 8,
  },
});

class SimpleSelectField extends Component {
  state = {
    value: '',
  };

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    const classes = this.props.classes;

    return (
      <Card>
        <CardHeader title="Basic Select Field" />
        <CardContent>
          <SelectField
            className={classes.selectBox}
            label="Basic"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
          </SelectField>
          <SelectField
            className={classes.selectBox}
            label="Hidden Label"
            hideLabel
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
          </SelectField>
          <SelectField
            className={classes.selectBox}
            label="Disabled"
            value={this.state.value}
            disabled
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
          </SelectField>
        </CardContent>
      </Card>
    );
  }
}

SimpleSelectField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SimpleSelectField);
