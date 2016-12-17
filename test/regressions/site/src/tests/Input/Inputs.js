// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Input from 'material-ui/Input/Input';

const styleSheet = createStyleSheet('Inputs', () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: 10,
  },
}));

export default class Inputs extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.focusInput.focus();
  }

  focusInput = undefined;

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div className={classes.container}>
        <Input
          defaultValue="Hello world"
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
          ref={(c) => { this.focusInput = c; }}
          className={classes.input}
        />
      </div>
    );
  }
}
