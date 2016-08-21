// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import TextField, { TextFieldInput, TextFieldLabel } from 'material-ui/TextField';

const styleSheet = createStyleSheet('CompleteTextField', () => ({
  textField: {
    marginLeft: 10,
    marginRight: 10,
  },
}));

export default class CompleteTextField extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    value: '',
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    return (
      <div>
        <TextField className={classes.textField}>
          <TextFieldLabel className={classes.label} htmlFor="name">
            Name
          </TextFieldLabel>
          <TextFieldInput
            className={classes.input}
            id="name"
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
          />
        </TextField>
      </div>
    );
  }
}

