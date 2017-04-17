// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import TextField from 'material-ui/TextField';

const styleSheet = createStyleSheet('TextFields', () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: 10,
  },
}));

export default class TextFields extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    name: 'Cat in the Hat',
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div className={classes.container}>
        <TextField
          id="name"
          label="Name"
          className={classes.input}
          value={this.state.name}
          onChange={(event) => this.setState({ name: event.target.value })}
        />
        <TextField
          id="uncontrolled"
          label="Uncontrolled"
          defaultValue="foo"
          className={classes.input}
        />
        <TextField
          required
          id="required"
          label="Required"
          defaultValue="Hello World"
          className={classes.input}
        />
        <TextField
          error
          id="error"
          label="Error"
          defaultValue="Hello World"
          className={classes.input}
        />
        <TextField
          id="password"
          label="Password"
          className={classes.input}
          type="password"
        />
      </div>
    );
  }
}
