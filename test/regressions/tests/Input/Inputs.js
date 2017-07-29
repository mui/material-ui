// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input/Input';

const styleSheet = createStyleSheet(() => ({
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

class Inputs extends Component {
  componentDidMount() {
    this.focusInput.focus();
  }

  focusInput = null;

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.container}>
          <Input value="Hello world" className={classes.input} />
          <Input placeholder="Placeholder" className={classes.input} />
          <Input value="Disabled" className={classes.input} disabled />
          <Input error value="Error" className={classes.input} />
          <Input
            value="Focused"
            inputRef={node => {
              this.focusInput = node;
            }}
            className={classes.input}
          />
        </div>
        <Input value="Large input" className={classNames(classes.input, classes.large)} />
      </div>
    );
  }
}

Inputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Inputs);
