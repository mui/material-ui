// @flow weak

import React, { Component } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Input from 'material-ui/Input/Input';

const styleSheet = createStyleSheet('Inputs', () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
  },
  input: {
    margin: 10,
  },
  large: {
    width: 300,
  },
}));

export default class Inputs extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  componentDidMount() {
    this.focusInput.focus();
  }

  focusInput = null;

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div>
        <div className={classes.container}>
          <Input
            value="Hello world"
            className={classes.input}
          />
          <Input
            placeholder="Placeholder"
            className={classes.input}
          />
          <Input
            value="Disabled"
            className={classes.input}
            disabled
          />
          <Input
            error
            value="Error"
            className={classes.input}
          />
          <Input
            value="Focused"
            inputRef={(node) => { this.focusInput = node; }}
            className={classes.input}
          />
        </div>
        <Input
          value="Large input"
          className={classNames(classes.input, classes.large)}
        />
      </div>
    );
  }
}
