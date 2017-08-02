// @flow weak
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Card, { CardHeader, CardContent } from 'material-ui/Card';

const styleSheet = createStyleSheet('FocusSelectField', () => ({
  row: {
    display: 'flex',
  },
  column: {
    width: 200,
    flex: 1,
    flexDirection: 'row',
    margin: 8,
  },
}));

class FocusSelectField extends Component {
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
    const classes = this.props.classes;

    return (
      <Card>
        <CardHeader title="Focus Select Field" />
        <CardContent>
          <div className={classes.row}>
            <TextField className={classes.column} label="Focus Here" />
            <SelectField
              className={classes.column}
              label="Tab Here"
              value={this.state.value}
              onChange={this.handleChange}
              InputProps={{
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
            <FormControlLabel
              control={<Checkbox checked={this.state.selectFocused} />}
              label="Is Focused"
              className={classes.column}
              disabled
            />
            <FormControlLabel
              control={<Checkbox checked={this.state.selectClean} />}
              label="Is Clean"
              className={classes.column}
              disabled
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}

FocusSelectField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FocusSelectField);
