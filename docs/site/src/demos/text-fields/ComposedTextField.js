// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';

const styleSheet = createStyleSheet('ComposedTextField', () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: 10,
  },
}));

export default class ComposedTextField extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    name: 'Composed TextField',
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div className={classes.container}>
        <FormControl className={classes.input}>
          <InputLabel htmlFor="name">
            Name
          </InputLabel>
          <Input
            id="name"
            value={this.state.name}
            onChange={(event) => this.setState({ name: event.target.value })}
          />
        </FormControl>
      </div>
    );
  }
}

